const express = require("express");
const router = express.Router();
const config = require("config");
// Import controller
const CategoriesController = require("../apps/controllers/apis/category");
const ProductController = require("../apps/controllers/apis/product");
const OrderController = require("../apps/controllers/apis/order");
//Router

router.get(
  `${config.get("app.prefixApiVersion")}/category`,
  CategoriesController.index
);
router.get(
  `${config.get("app.prefixApiVersion")}/order`,
  OrderController.index
);
router.get(
  `${config.get("app.prefixApiVersion")}/products`,
  ProductController.index
);

module.exports = router;
