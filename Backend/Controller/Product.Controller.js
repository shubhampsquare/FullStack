const Product = require("../Models/Product.Model");

const getProducts = async (req, res) => {
  try {
    const data = await Product.aggregate([
      {
        $match: { price: { $gt: 1000 } },
      },
    ]);
    res.status(200).json(data);

    console.log(data, "datatatatata");
  } catch (error) {
    console.log("erorororoorororoorororooro", error);
    res.status(500).json({ message: "error occurs" });
  }
};

const addProduct = async (req, res) => {
  try {
    res.status(200).json({ message: "Product Added successfully!" });
  } catch (error) {
    console.log("erorororoororororooror2222222222222222222");
    res.status(500).json({ message: "error occurs" });
  }
};

const getPageProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    let totalCount = await Product.countDocuments();
    let Products = await Product.find().skip(skip).limit(limit);

    res.status(200).json({
      totalProducts: totalCount,
      pageNo: page,
      totalProducts: limit,
      products: Products,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCursorProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const cursor = req.query.cursor;

    let query = {};
    if (cursor) {
      query._id = { $gt: cursor };
    }

    const page = parseInt(req.query.cursor) || 1;
    const Products = await Product.find(query).sort({ _id: 1 }).limit(limit);

    const endDocument = await Product.find().sort({ _id: -1 }).limit(1);
    console.log(endDocument, "enddddddddddocccccc");

    res.status(200).json({
      nextCursor:
        Products.length > 0 ? Products[Products.length - 1]._id : null,
      totalProducts: limit,
      products: Products,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getaggregateProducts = async (req, res) => {};

module.exports = {
  getProducts,
  addProduct,
  getPageProduct,
  getCursorProducts,
  getaggregateProducts,
};
