const crypto = require("crypto");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const { sanitizeUser, sendMail } = require("../constants/services");
exports.createUser = async (req, res) => {
  let user = await User.find({ email: req.body.email });
  if (user.length) {
    return res.status(409).json({ message: "User already exists" });
  }
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        user = new User({
          ...req.body,
          password: hashedPassword,
          salt,
        });
        const doc = await user.save();

        req.login(sanitizeUser(doc), function (err) {
          if (err) {
            res.status(400).json(err);
            console.log(err);
          } else {
            const token = jwt.sign(sanitizeUser(doc), "hello");
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                httpOnly: true,
              })
              .status(201)
              .json({ id: doc.id, role: doc.role });
          }
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.loginUser = (req, res) => {
  const user = req.user;
  res
    .cookie("jwt", user.token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
    })
    .status(201)
    .json({ id: user.id, role: user.role });
};

exports.checkUser = (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.sendStatus(400);
  }
};

exports.logout = (req, res) => {
  res
    .cookie("jwt", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200);
};

exports.resetPasswordRequest = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email: email });
  if (user) {
    const token = await crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    await user.save();
    const resetPasswordLink =
      "https://nike-clone-bz9g.vercel.app/resetPassword?token=" +
      token +
      "&email=" +
      email;
    const subject = "reset password for Nike";
    const html = `<p>Click <a href=${resetPasswordLink}>here</a> to Reset your password</p>`;
    if (email) {
      const response = await sendMail({ to: email, subject, html });
      res.json(response);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};

exports.resetPassword = async (req, res) => {
  const { email, password, token } = req.body;
  const user = await User.findOne({ email: email, resetPasswordToken: token });
  if (user) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        user.password = hashedPassword;
        user.salt = salt;
        await user.save();
        const subject = "password successfully reset for e-commerce";
        const html = `<p>Successfully able to Reset Password</p>`;
        if (email) {
          const response = await sendMail({ to: email, subject, html });
          res.json(response);
        } else {
          res.sendStatus(400);
        }
      }
    );
  } else {
    res.sendStatus(400);
  }
};
