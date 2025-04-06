import express from "express";
import Order from "../models/order.js";

const router = express.Router();

// Get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Mark order as done
router.put("/orders/:id/done", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "Done" },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Error updating order" });
  }
});

// Delete order
router.delete("/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting order" });
  }
});

// Update order
router.put("/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: "Error updating order" });
  }
});

export default router;
