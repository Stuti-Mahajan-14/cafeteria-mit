const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Admin = require("../models/admin");

// Register a new user or admin
const register = async (req, res) => {
  const { name, email, password, cardNumber, role } = req.body;

  try {
    if (role === "user") {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = new User({ name, email, password: hashedPassword, cardNumber, role });
      await user.save();

      // Generate JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({ token });
    } else if (role === "admin") {
      // Check if admin already exists
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new admin
      admin = new Admin({ name, email, password: hashedPassword, role });
      await admin.save();

      // Generate JWT token
      const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({ token });
    } else {
      res.status(400).json({ message: "Invalid role" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login user or admin
const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (role === "user") {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    } else if (role === "admin") {
      // Check if admin exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: "Invalid role" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMe = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const Model = decoded.role === "user" ? User : Admin;
    const user = await Model.findById(decoded.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { register, login, getMe };



