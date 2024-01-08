const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controller/productController");
const { authorizedRole, isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

// router.get("/products", getAllProducts);
router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizedRole("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizedRole("admin"), updateProduct)
  .get(isAuthenticatedUser, authorizedRole("admin"), getProductDetails)
  .delete(deleteProduct);
// router.delete("/product/:id", deleteProduct);

module.exports = router;
