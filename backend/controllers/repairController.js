// const { response } = require( "express");
const asyncHandler = require("express-async-handler");
const Repair = require("../models/repairModel");
const Car = require("../models/carModel");

// @desc    Fetch all repairs
// @route   GET /api/repairs
// @access  Private
const getRepairs = asyncHandler(async (req, res) => {
  try {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Repair.countDocuments();
    const repairs = await Repair.find()
      .sort({ date: "desc" })
      .populate({
        path: "car",
        select: "-repairs",
        populate: {
          path: "owner",
          select: "_id name phone",
          model: "Customer",
        },
      })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    //Ordenando ascendentemente luego de obtenerlo con el high order function de sort
    //const repairsSorted = repairs.sort((a, b) => (a.date < b.date ? -1 : 1));

    res.json({
      page,
      pages: Math.ceil(count / pageSize),
      count,
      repairs,
      //repairsSorted,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Fetch all repairs of a car
// @route   GET /api/repairs/car/:id
// @access  Private
const getRepairsByCar = asyncHandler(async (req, res) => {
  try {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const car = await Car.findById(req.params.id);

    if (car) {
      const count = await Repair.countDocuments({ car: car._id });
      const repairs = await Repair.find({ car: car._id })
        .populate({
          path: "car",
          select: "-repairs",
          populate: {
            path: "owner",
            select: "_id name phone",
            model: "Customer",
          },
        })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      res.json({
        page,
        pages: Math.ceil(count / pageSize),
        count,
        repairs,
      });
    } else {
      res.status(404);
      throw new Error("The car does not exist in our database");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Create a repair
// @route   POST /api/repairs
// @access  Private
const createRepair = asyncHandler(async (req, res) => {
  try {
    const { date, description, carToRepair } = req.body;
    const car = await Car.findById(carToRepair);
    if (car) {
      const repair = await Repair.create({
        date,
        description,
        car: carToRepair,
      });
      if (repair) {
        car.repairs = [...car.repairs, repair._id];
        const carUpdated = await await car.save();
        res.status(201).json({
          _id: repair._id,
          date: repair.date,
          description: repair.description,
          car: carUpdated,
        });
      } else {
        res.status(400);
        throw new Error("Invalid repair data");
      }
    } else {
      res.status(404);
      throw new Error("The car does not exist in our database");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

exports.getRepairs = getRepairs;
exports.getRepairsByCar = getRepairsByCar;
exports.createRepair = createRepair;
