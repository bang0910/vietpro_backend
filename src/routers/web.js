const express = require("express");
const router = express.Router();
const config = require("config");
// Import controller
const CategoriesController = require("../apps/controllers/apis/category");
const ProductController = require("../apps/controllers/apis/product");
const OrderController = require("../apps/controllers/apis/order");
const AuthController = require("../apps/controllers/apis/auth");
const CustomerController = require("../apps/controllers/apis/customer");
// Import Middleware
const AuthMiddleware = require("../middlewares/auth");
//Router
router.get(`/categories`, CategoriesController.index);
router.get(`/categories/:id`, CategoriesController.show);
router.get(`/categories/:id/products`, CategoriesController.categoryProducts);

router.get(`/customers/:id/order`, OrderController.index);
router.get(`/order/:id/show`, OrderController.show);
router.patch(`/order/:id/cancelled`, OrderController.cancelled);

router.get(`/products`, ProductController.index);
router.get(`/products/:id`, ProductController.show);
router.get(`/products/:id/comments`, ProductController.comments);
router.post(`/products/:id/comments`, ProductController.storeComments);

router.post(`/order`, OrderController.order);

router.post(`/customers/login`, AuthController.loginCustomer);
router.post(`/customers/register`, AuthController.registerCustomer);
router.post(`/customers/:id/update`, CustomerController.update);
router.get(
  `/customer/test`,
  AuthMiddleware.verifyAuthenticationCustomer,
  (req, res) => {
    res.status(200).json("success");
  }
);
//refreshToken
router.post(`/auth/refresh-token`, AuthController.loginCustomer);
module.exports = router;
router.post(
  `/customers/logout`,
  AuthMiddleware.verifyAuthenticationCustomer,
  AuthController.logoutCustomer
);
