const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  type: { type: String },
  budget: { type: String },
  desc: { type: String },
  date: { type: String },
  status: { type: String, default: "New" },
}, { timestamps: true });

module.exports = mongoose.model("Lead", LeadSchema);
