const OrderModel = require("../../models/order");
const ProductModel = require("../../models/product");
const transporter = require("../../../libs/transporter");
const path = require("path");
const ejs = require("ejs");
const CustomerModel = require("../../models/customer");
const pagination = require("../../../libs/pagination");
// const config = require("config");
exports.index = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {};
    query.customerId = id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = limit * page - limit;
    const orders = await OrderModel.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      status: "success",
      data: {
        docs: orders,
        pages: await pagination(OrderModel, query, limit, page),
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);
    return res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.cancelled = async (req, res) => {
  try {
    const { id } = req.params;
    await OrderModel.updateOne({ _id: id }, { $set: { status: "cancelled" } });
    return res.status(200).json({
      status: "success",
      message: "order cancelled successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.order = async (req, res) => {
  try {
    const { body } = req;
    const { totalPrice } = body;
    const { customerId } = body;
    //customerId
    const customer = await CustomerModel.findById(customerId);
    const prdIds = body.items.map((item) => item.prd_id);
    const products = await ProductModel.find({
      _id: { $in: prdIds },
    });
    //items new
    const newItems = body.items.map((item) => {
      const product = products.find((p) => p._id.toString() === item.prd_id);
      return {
        ...item,
        name: product ? product.name : "Unknown Product",
      };
    });
    // const newBody = {
    //   ...body,
    //   items: newItems,
    // };
    //insert db
    await new OrderModel(body).save();

    //send mail
    const templatePath = path.join(__dirname, "../../../views/mail.ejs");

    const html = await ejs.renderFile(templatePath, {
      customer,
      totalPrice,
      newItems,
    });

    await transporter.sendMail({
      from: "I am hacker", // sender address
      to: customer.email, // list of receivers
      subject: "Xác nhận đơn hàng", // Subject line
      html,
    });
    return res.status(200).json({
      status: "success",
      message: "Order successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
