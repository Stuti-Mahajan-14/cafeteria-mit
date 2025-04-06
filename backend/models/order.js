import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  cardId: {
    type: String,
    required: true,
  },
  itemsOrdered: {
    type: [String],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

export default mongoose.model("Order", orderSchema);
