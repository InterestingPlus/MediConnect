const Category = require("../models/category.model.js");

module.exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({
      name,
    });

    console.log("New Category Has Added = ", name);

    return res.status(200).json({
      message: "New Category Has Added Successfully",
      data: category,
      status: true,
    });
  } catch (err) {
    console.log("Error While Adding Category : ", err);

    res.status(500).json({
      message: "Failed to Add Category!",
      status: false,
    });
  }
};

module.exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      message: "All Categories has Fetched Successfully",
      data: categories,
      status: true,
    });
  } catch (err) {
    console.log("Error While Fetching Categories : ", err);

    res.status(500).json({
      message: "Failed to Get Categories!",
      status: false,
    });
  }
};
