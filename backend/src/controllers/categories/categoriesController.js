import categoriesModel from "../../models/categories.js";
const categoriesController = {};

categoriesController.getCategories = async (req, res) => {
  try {
    const response = await categoriesModel.find();
    return res.status(200).json(response);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

categoriesController.insertCategorie = async (req, res) => {
  try {
    let { categoryName,
    description,
    color,
    isActive, } = req.body;

    if (!categoryName || !description) {
      return res.status(400).json({ message: "Ningún campo debe estar vacio" });
    }
    const payload = new categoriesModel({
      categoryName,
    description,
    color,
    isActive,
    });
    await payload.save();
    return res.status(200).json({ message: "Data save" });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

categoriesController.updateCategorie= async (req, res) => {
  try {
    let { categoryName,
    description,
    color,
    isActive, } = req.body;

    categoryName = tittle?.trim();
    description = description?.trim();

    if (!categoryName || !description) {
      return res.status(400).json({ message: "Ningún campo debe estar vacio" });
    }

    const payload = await categoriesModel.findByIdAndUpdate(
      req.params.id,
      {
        categoryName,
    description,
    color,
    isActive,
      },
      { new: true },
    );
    if (!payload) return res.status(400).json({ message: "Field required" });
    return res
      .status(200)
      .json({ message: "Datos actualizados correctamente" });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

categoriesController.deleteCategorie = async (req, res) => {
  try {
    const response = await categoriesModel.findByIdAndDelete(req.params.id);
    if (!response) return res.status(400).json({ message: "Data not found" });
    return res.status(200).json({ message: "Data eliminada correctamente" });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default categoriesController;
