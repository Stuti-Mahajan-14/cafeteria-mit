import MenuItem from "../models/MenuCategory.js";

// Get all menu items
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

  export default getMenuItems;