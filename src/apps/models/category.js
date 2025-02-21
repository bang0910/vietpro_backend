const mongoose = require("../../common/init.mongo")();
const categorySChema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const CategoryModel = mongoose.model(
  "Categories",
  categorySChema,
  "categories"
);
module.exports = CategoryModel;
