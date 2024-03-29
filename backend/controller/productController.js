const Product = require("../Model/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
// Create Product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  // console.log("Insilde create product");

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
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
  // return next(new ErrorHandler("Product Not found with Choice", 500));
  const productsCount = await Product.countDocuments();
  const resultPerPage = 8;
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  // let products = await apiFeatures.query;

  // let filteredProductsCount = products.length;
  // apiFeatures.pagination(resultPerPage);
  // products = await apiFeatures.query;
  // console.log("query: ", req.query);
  let products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    productsCount,
    products,
    resultPerPage,
    // filteredProductsCount,
  });

  next();
});

// Get all products (Admin)
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });

  next();
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
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not found", 500));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product -- Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  // console.log("delete product");

  const product = await Product.findById(req.params.id);

  // Loop through product images and delete them from Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }

  // Delete the product from the database
  await Product.findByIdAndDelete(req.params.id);

  // let product = await Product.find(req.params.id);

  // for (let i = 0; i < product.images.length; i++) {
  //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  // }

  // const product = await Product.findByIdAndDelete(
  //   req.params.id,
  //   req.params.body
  // );

  // await product.delete()

  if (!product) {
    return next(new ErrorHandler("Product Not found with that ID", 500));
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// create New review or update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user && rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// get All reviews of a single product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  console.log(req.query);
  const product = await Product.findById(req.query.productId);

  // console.log(product);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id
  );

  // console.log(reviews);
  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  // const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
  });
});
