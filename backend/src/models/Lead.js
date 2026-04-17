const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  website: { type: String },
  businessType: { type: String },
  budget: { type: String },
  message: { type: String },
  date: { type: String },
  timeSlot: { type: String },
  status: { type: String, enum: ["new", "contacted", "converted", "lost"], default: "new" },
}, { timestamps: true });

module.exports = mongoose.model("Lead", LeadSchema);
