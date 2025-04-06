import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  feedback: String,
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;
