const mongoose = require("mongoose");
const { Schema } = mongoose;
const colorSchema = new Schema({
  name: { type: String, require: true, unique: true },
  class: { type: String, require: true, unique: true },
  selectedClass: { type: String, require: true, unique: true },
});
const virtual = colorSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
colorSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Color = mongoose.model("Color", colorSchema);
