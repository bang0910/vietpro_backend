const mongoose = require("../../common/init.mongo")();
const orderSchema = new mongoose.Schema({
  totalPrice: {
    type: String,
    default: 0,
  },
  fullName: {
    type: String,
    required: null,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  items: {
    prd_id: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
});
const OrderModel = mongoose.model("Orders", orderSchema, "orders");
module.exports = OrderModel;
