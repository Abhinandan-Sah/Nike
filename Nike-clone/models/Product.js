const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    title: { type: String, require: true },
    detail: { type: String, require: true },
    price: { type: Number, require: true },
    discount: { type: Number, require: true },
    sizes: { type: [String], require: true },
    colors: { type: [Schema.Types.Mixed], require: true },
    category: { type: String, require: true },
    gender: { type: String },
    kids: { type: String },
    stock: {
      type: Number,
      min: [0, "wrong min stock"],
      default: 0,
      require: true,
    },
    rating: {
      type: Number,
      min: [0, "wrong min rating"],
      max: [5, "wrong max price"],
      default: 0,
    },
    origin: { type: String, require: true },
    declaration: { type: String, require: true },
    marketedBy: { type: String, require: true },
    images: { type: [String], require: true },
    highlights: { type: [String], require: true },
    discountPrice: { type: Number },
  },
  {
    timestamps: true,
  }
);
const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Product = mongoose.model("Product", productSchema);
