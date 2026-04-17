const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.register = async (req, res) => {
    // Hidden route for seeding or initial setup
    const { name, email, password, secretKey } = req.body;
    if (secretKey !== process.env.JWT_SECRET) return res.status(403).json({ message: "Unauthorized" });

    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ message: "User already exists or server error" });
    }
}
