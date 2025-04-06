import express from "express";
import Order from "../models/order.js";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// Add new order
router.post("/add", async (req, res) => {
  try {
    const { cardId, itemsOrdered, totalAmount, timestamp } = req.body;
    const newOrder = new Order({ cardId, itemsOrdered, totalAmount, timestamp });
    await newOrder.save();
    res.status(200).json({ message: "Order saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ timestamp: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});
// POST: /api/feedback
router.post('/feedback', async (req, res) => {
    const { orderId, feedback } = req.body;
    const newFeedback = new Feedback({ orderId, feedback });
    await newFeedback.save();
    res.json({ message: "Feedback saved." });
  });
  
  // GET: /api/feedbacks
  router.get('/feedbacks', async (req, res) => {
    const all = await Feedback.find();
    res.json(all);
  });
  
export default router;
