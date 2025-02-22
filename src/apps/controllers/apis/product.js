const ProductModel = require("../../models/product");
const CommentModel = require("../../models/comment.js");
const pagination = require("../../../libs/pagination");
exports.index = async (req, res) => {
  try {
    const query = {};
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = page * limit - limit;
    if (req.query.is_featured) query.is_featured = req.query.is_featured;
    if (req.query.is_stock) query.is_stock = req.query.is_stock;
    const products = await ProductModel.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    // cấu trúc lọc dữ liệu
    res.status(200).json({
      status: "success",
      filters: {
        is_featured: req.query.is_featured || null,
        is_stock: req.query.is_stock || null,
        page,
        limit,
      },
      data: {
        docs: products,
        pages: await pagination(ProductModel, query, limit, page),
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    return res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    return req.status(500).json(error);
  }
};
exports.comments = async (req, res) => {
  const { id } = req.params;
  const query = {};
  query.product_id = id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = page * limit - limit;
  const comments = await CommentModel.find(query)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  res.status(200).json({
    status: "success",
    filters: {
      page,
      limit,
      product_id: id,
    },
    data: {
      docs: comments,
      pages: await pagination(CommentModel, query, page, limit),
    },
  });
};
exports.storeComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = req.body;
    comment.product_id = id;
    await new CommentModel(comment).save();
    return res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    return req.status(500).json(error);
  }
};
