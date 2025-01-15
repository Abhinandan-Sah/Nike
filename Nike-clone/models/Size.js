const mongoose = require("mongoose");
const { Schema } = mongoose;
const sizeSchema = new Schema({
  label: { type: String, require: true, unique: true },
  value: { type: String, require: true, unique: true },
});
const virtual = sizeSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
sizeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Size = mongoose.model("Size", sizeSchema);
