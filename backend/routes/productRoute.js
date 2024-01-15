const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controller/productController");
const { authorizedRole, isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

// router.get("/products", getAllProducts);
router.route("/products").get(getAllProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedRole("admin"), createProduct);

// router
//   .route("/admin/product/:id")
//   .put(isAuthenticatedUser, authorizedRole("admin"), updateProduct)
//   .get(isAuthenticatedUser, authorizedRole("admin"), getProductDetails)
//   .delete(deleteProduct);
router.route("/admin/product/:id").get(getProductDetails).delete(deleteProduct);

router.route("/product/:id").delete(deleteProduct);
// router.delete("/product/:id", deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);
module.exports = router;
