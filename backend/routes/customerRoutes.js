const express = require("express");
const router = express.Router();
const {
  getCustomers,
  createCustomer,
} = require("../controllers/customerController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createCustomer).get(protect, getCustomers);

module.exports = router;
