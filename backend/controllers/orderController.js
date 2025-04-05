import Order from "../models/order.js";

// Create a new order
const createOrder = async (req, res) => {
  const { user, items, totalAmount } = req.body;

  try {
    const order = new Order({ user, items, totalAmount });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};export { createOrder };