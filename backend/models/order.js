const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Order", orderSchema);