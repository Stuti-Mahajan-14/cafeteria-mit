// routes/menuRoutes.js
import express from "express";
import MenuCategory from "../models/MenuCategory.js";

const router = express.Router();

// GET all menu categories
// Replace MenuCategory with your actual food item model (e.g., FoodItem)
// Route to fetch all categories and items
router.get("/", async (req, res) => {
    try {
      const categories = await MenuCategory.find();
      res.json(categories); // Return the entire category structure with items
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  

// ADD new item to a category
router.post("/:category/items", async (req, res) => {
  const { category } = req.params;
  const newItem = req.body;

  const menuCategory = await MenuCategory.findOne({ category });

  if (menuCategory) {
    menuCategory.items.push(newItem);
    await menuCategory.save();
    res.status(201).json(menuCategory);
  } else {
    // If category doesn't exist, create it
    const newCategory = new MenuCategory({ category, items: [newItem] });
    await newCategory.save();
    res.status(201).json(newCategory);
  }
});

// DELETE item by ID
router.delete("/:category/items/:id", async (req, res) => {
  const { category, id } = req.params;

  const menuCategory = await MenuCategory.findOne({ category });

  if (menuCategory) {
    menuCategory.items = menuCategory.items.filter((item) => item.id !== parseInt(id));
    await menuCategory.save();
    res.json({ message: "Item deleted" });
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});

// UPDATE an item
router.put("/:category/items/:id", async (req, res) => {
  const { category, id } = req.params;
  const updatedItem = req.body;

  const menuCategory = await MenuCategory.findOne({ category });

  if (menuCategory) {
    const itemIndex = menuCategory.items.findIndex((item) => item.id === parseInt(id));
    if (itemIndex !== -1) {
      menuCategory.items[itemIndex] = { ...menuCategory.items[itemIndex], ...updatedItem };
      await menuCategory.save();
      res.json(menuCategory.items[itemIndex]);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});

export default router;
