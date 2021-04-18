// const { response } = require( "express");
const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");

// @desc    Fetch all customers
// @route   GET /api/customers
// @access  Private
const getCustomers = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i", //case insensitve
          },
        }
      : {};
    const count = await Customer.countDocuments({ ...keyword });
    const customers = await Customer.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({
      page,
      pages: Math.ceil(count / pageSize),
      customers,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Create a customer
// @route   POST /api/customers
// @access  Private
const createCustomer = asyncHandler(async (req, res) => {
  try {
    const { name, phone } = req.body;
    const customer = await Customer.create({
      name,
      phone,
    });
    if (customer) {
      res.status(201).json({
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      });
    } else {
      res.status(400);
      throw new Error("Invalid customer data");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

exports.getCustomers = getCustomers;
exports.createCustomer = createCustomer;
