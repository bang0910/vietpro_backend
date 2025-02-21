const ProductModel = require("../../models/product");
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
