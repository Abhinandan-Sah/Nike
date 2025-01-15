const mongoose = require("mongoose");
const { Schema } = mongoose;
const reviewSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", require: true },
  user: { type: Schema.Types.ObjectId, ref: "User", require: true },
  rating: {
    type: Number,
    require: true,
    min: [1, "wrong min rating"],
    max: [5, "wrong max review"],
  },
  message: { type: String, require: true },
});

const virtual = reviewSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
reviewSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Review = mongoose.model("Review", reviewSchema);
