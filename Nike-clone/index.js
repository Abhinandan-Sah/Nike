require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const cookieParser = require("cookie-parser");
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const colorsRouter = require("./routes/Colors");
const sizesRouter = require("./routes/Sizes");
const usersRouter = require("./routes/Users");
const authsRouter = require("./routes/Auths");
const cartRouter = require("./routes/Carts");
const orderRouter = require("./routes/Orders");
const favouriteRouter = require("./routes/Favourites");
const reviewRouter = require("./routes/Reviews");
const { User } = require("./models/User");
const {
  sanitizeUser,
  cookieExtractor,
  isAuth,
} = require("./constants/services");
const bodyParser = require("body-parser");
const { Order } = require("./models/Order");
let opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = "hello";
//middlewares
server.use(express.static(path.resolve(__dirname, "build")));
server.use(cookieParser());
server.use(cors());
server.use(bodyParser.json());
server.post("/verification", async (req, res) => {
  // do a validation
  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    const orderId = req.body.payload.payment.entity.notes.orderId;
    const order = await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "received",
    });
  } else {
    // pass it
  }
  res.json({ status: "ok" });
});

server.use(express.json());
server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate("session"));
server.use("/products", productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/colors", colorsRouter.router);
server.use("/sizes", sizesRouter.router);
server.use("/users", isAuth(), usersRouter.router);
server.use("/auths", authsRouter.router);
server.use("/carts", isAuth(), cartRouter.router);
server.use("/favourites", isAuth(), favouriteRouter.router);
server.use("/orders", isAuth(), orderRouter.router);
server.use("/reviews", reviewRouter.router);

server.get("*", (req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
});

passport.use(
  "Local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Invalid credentials" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Invalid credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), "hello");
          done(null, { id: user.id, role: user.role, token });
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

main().catch((err) => console.log(err));
const port = process.env.PORT || 8080;
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected");
}

server.listen(port, () => {
  console.log("Server started");
});
