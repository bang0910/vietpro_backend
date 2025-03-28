const mongoose = require("../../common/init.mongo")();
const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Customers",
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    status: {
      type: String, // shipping/ deliveried / cancelled
      default: "shipping",
    },
    items: [
      {
        prd_id: {
          type: mongoose.Types.ObjectId,
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
    ],
  },
  { timestamps: true }
);
const OrderModel = mongoose.model("Orders", orderSchema, "orders");
module.exports = OrderModel;
