const Product = require("../Model/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
// Create Product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  // console.log("Insilde create product");
  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

// catchAsyncError(async (req, res, next) => {
//   // console.log("Insilde create product");
//   const product = await Product.create(req.body);

//   res.status(200).json({
//     success: true,
//     product,
//   });
// });

// Get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const productCount = await Product.countDocuments();
  const resultPerPage = 5;
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  // console.log("query: ", req.query);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    productCount,
    products,
  });

  // next();
});

// Get a single product
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not found", 500));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update product -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new ErrorHandler("Product Not found", 500));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product -- Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  // console.log("delete product");
  const product = await Product.findByIdAndDelete(
    req.params.id,
    req.params.body
  );

  if (!product) {
    return next(new ErrorHandler("Product Not found with that ID", 500));
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
