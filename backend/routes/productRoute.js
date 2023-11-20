const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controller/productController");

const router = express.Router();

router.get("/products", getAllProducts);
router.route("/product/new").post(createProduct);
router
  .route("/product/:id")
  .put(updateProduct)
  .get(getProductDetails)
  .delete(deleteProduct);
// router.delete("/product/:id", deleteProduct);

module.exports = router;
