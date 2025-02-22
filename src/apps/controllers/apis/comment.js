// exports.comments = async (req, res) => {
//   const query = {};
//   query.product_id = req.params.id;
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const skip = page * limit - limit;
//   const comments = await CommentModel.find(query)
//     .sort({ _id: -1 })
//     .skip(skip)
//     .limit(limit);
//   res.status(200).json({
//     status: "success",
//     data: {
//       docs: comments,
//     },
//     pages: await pagination(CommentModel, query, page, limit),
//   });
// };
