const mongoose = require("../../common/init.mongo")();
const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Products",
    },
  },
  { timestamps: true }
);
const CommentModel = mongoose.model("Comments", commentSchema, "comments");
module.exports = CommentModel;
