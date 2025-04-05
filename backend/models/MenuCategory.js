// models/MenuCategory.js
import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({
  calories: Number,
  carbs: String,
  protein: String,
  fat: String,
  sugar: String,
});

const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  img: String,
  nutrition: nutritionSchema,
});

const menuCategorySchema = new mongoose.Schema({
  category: String,
  items: [itemSchema],
});

const MenuCategory = mongoose.model("MenuCategory", menuCategorySchema);
export default MenuCategory;
