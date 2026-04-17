const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config({ path: "../../.env" });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: "takeinstudio@gmail.com" });
    if (existingUser) {
      console.log("Admin account already exists.");
      process.exit();
    }

    // Create the admin user (Password: change-this-immediately)
    await User.create({
      name: "TakeIN Admin",
      email: "takeinstudio@gmail.com",
      password: "adminp@ssword123", // They should change this after login
      role: "admin"
    });

    console.log("✅ Admin account seeded successfully!");
    console.log("Email: takeinstudio@gmail.com");
    console.log("Password: adminp@ssword123");
    
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedAdmin();
