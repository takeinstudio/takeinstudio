const express = require("express");
const router = express.Router();
const { createLead, getLeads } = require("../controllers/lead.controller");
const auth = require("../middleware/auth.middleware");

// Public lead submission
router.post("/", createLead);

// Admin-only lead retrieval
router.get("/", getLeads);

module.exports = router;
