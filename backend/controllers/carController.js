// const { response } = require( "express");
const asyncHandler = require("express-async-handler");
const Car = require("../models/carModel");
const Customer = require("../models/customerModel");

// @desc    Fetch all cars of a customer
// @route   GET /api/cars/customer/:id
// @access  Private
const getcarsByCustomer = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      const count = await Car.countDocuments({ owner: customer._id });
      const cars = await Car.find({ owner: customer._id })
        .populate("owner", "-cars")
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      res.json({
        page,
        pages: Math.ceil(count / pageSize),
        count,
        cars,
      });
    } else {
      res.status(404);
      throw new Error("The owner does not exist in our database");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Create a car
// @route   POST /api/cars
// @access  Private
const createCar = asyncHandler(async (req, res) => {
  try {
    const { model, brand, year, owner } = req.body;
    const customer = await Customer.findById(owner);
    if (customer) {
      const car = await Car.create({
        model,
        brand,
        year,
        owner,
      });
      if (car) {
        customer.cars = [...customer.cars, car._id];
        const customerUpdated = await customer.save();
        res.status(201).json({
          _id: car._id,
          model: car.name,
          brand: car.phone,
          year: car.year,
          owner: customerUpdated,
        });
      } else {
        res.status(400);
        throw new Error("Invalid car data");
      }
    } else {
      res.status(404);
      throw new Error("The owner does not exist in our database");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

exports.getcarsByCustomer = getcarsByCustomer;
exports.createCar = createCar;
