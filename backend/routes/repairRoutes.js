const express = require("express");
const router = express.Router();
const {
  getRepairs,
  getRepairsByCar,
  createRepair,
} = require("../controllers/repairController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createRepair).get(protect, getRepairs);
router.route("/car/:id").get(protect, getRepairsByCar);

module.exports = router;
