const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String },
        qty: { type: Number, default: 1, min: 1 },
        price: { type: Number, min: 0 }
      }
    ],
    total: { type: Number, min: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

