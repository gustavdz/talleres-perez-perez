const mongoose = require("mongoose");

const repairSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Car",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Repair", repairSchema);
