const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    repairs: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: "Repair",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);
