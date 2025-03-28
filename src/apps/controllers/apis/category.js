const pagination = require("../../../libs/pagination");
const CategoryModel = require("../../models/category");
const ProductModel = require("../../models/product");
exports.index = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await CategoryModel.find().sort({ _id: 1 });
    res.status(200).json({
      status: "success",
      data: {
        docs: categories,
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.categoryProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {};
    query.category_id = id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = page * limit - limit;
    const products = await ProductModel.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      status: "success",
      filters: {
        page,
        limit,
        category_id: id,
      },
      data: {
        docs: products,
        page: await pagination(ProductModel, query, page, limit),
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
