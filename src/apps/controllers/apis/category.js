const CategoryModel = require("../../models/category");
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
