const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controller/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

// Admin can get all products
// router.route("/products").get(isAuthenticatedUser, authorizedRoles('admin'), getAllProducts);
router.route("/products").get(isAuthenticatedUser, getAllProducts);

// Any authenticated user can create a product
router.route("/products/new").post(isAuthenticatedUser, createProduct);

// Product update, delete, and get details routes
router
  .route("/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct)
  .get(getProductDetails);

module.exports = router;
