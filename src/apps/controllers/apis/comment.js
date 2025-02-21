exports.index = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        docs: categories,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
