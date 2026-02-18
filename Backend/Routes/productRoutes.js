const express = require("express");

// const getProducts = require("../Controller/Product.Controller")
const {
  getProducts,
  addProduct,
  getPageProduct,
  getCursorProducts,
  getaggregateProducts
} = require("../Controller/Product.Controller");

const router = express.Router();

console.log("hello this is the productRoutes");

// router.get("/getAll", getProducts);
router.post("/addProduct", addProduct);

// for pagination Offset-Based Pagination (Skip & Limit)
router.get("/getProducts", getPageProduct);

//Cursor-Based Pagination (Better for Large Data)
router.get("/getCursorProducts", getCursorProducts);

//aggregation-page based pagination with searching and price limit
router.get("/getaggregateProducts", getaggregateProducts);

module.exports = router;
