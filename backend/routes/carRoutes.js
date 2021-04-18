const express = require("express");
const router = express.Router();
const {
  getcarsByCustomer,
  createCar,
} = require("../controllers/carController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createCar);
router.route("/customer/:id").get(protect, getcarsByCustomer);

module.exports = router;
