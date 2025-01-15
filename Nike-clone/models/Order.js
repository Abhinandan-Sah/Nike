const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    items: { type: [Schema.Types.Mixed], require: true },
    totalAmount: { type: Number, require: true },
    totalItems: { type: Number, require: true },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    paymentMethod: {
      type: String,
      require: true,
      enum: {
        values: ["card", "cash"],
        message: "enum validator failed for payment method",
      },
    },
    paymentStatus: { type: String, default: "pending" },
    status: { type: String, default: "pending" },
    selectedAddress: { type: [Schema.Types.Mixed], require: true },
  },
  {
    timestamps: true,
  }
);

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Order = mongoose.model("Order", orderSchema);
