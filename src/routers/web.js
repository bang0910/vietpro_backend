const express = require("express");
const router = express.Router();
const config = require("config");
// Import controller
const CategoriesController = require("../apps/controllers/apis/category");
const ProductController = require("../apps/controllers/apis/product");
const OrderController = require("../apps/controllers/apis/order");
//Router

router.get(
  `${config.get("app.prefixApiVersion")}/categories`,
  CategoriesController.index
);
router.get(
  `${config.get("app.prefixApiVersion")}/categories/:id`,
  CategoriesController.show
);
router.get(
  `${config.get("app.prefixApiVersion")}/order`,
  OrderController.index
);
router.get(
  `${config.get("app.prefixApiVersion")}/products`,
  ProductController.index
);
router.get(
  `${config.get("app.prefixApiVersion")}/products/:id`,
  ProductController.show
);
router.get(
  `${config.get("app.prefixApiVersion")}/products/:id/comments`,
  ProductController.comments
);
router.post(
  `${config.get("app.prefixApiVersion")}/products/:id/comments`,
  ProductController.storeComments
);

module.exports = router;
