const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controller/productController");

const { isAuthenticatedUser,authorizedRoles } = require("../middleware/auth");
const router = express.Router();

// Admin can get all products
// router.route("/products").get(isAuthenticatedUser, authorizedRoles("admin"),getAllProducts);

router.route("/products").get(getAllProducts);

// router.route("/products").get(isAuthenticatedUser, getAllProducts);

// Any authenticated user can create a product
router.route("/products/new").post(isAuthenticatedUser, authorizedRoles("admin"),createProduct);

// Product update, delete, and get details routes
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)
  .get(getProductDetails);

module.exports = router;
