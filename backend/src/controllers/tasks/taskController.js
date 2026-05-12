import tasksModel from "../../models/tasks.js";
const taskController = {};

taskController.getTask = async (req, res) => {
  try {
    const response = await tasksModel.find();
    return res.status(200).json(response);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

taskController.insertTask = async (req, res) => {
  try {
    let { tittle, description, dueDate, priority, status } = req.body;

    if (!tittle || !description) {
      return res.status(400).json({ message: "Ningún campo debe estar vacio" });
    }
    const payload = new tasksModel({
      tittle,
      description,
      dueDate,
      priority,
      status,
    });
    await payload.save();
    return res.status(200).json({ message: "Data save" });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    let { tittle, description, dueDate, priority, status } = req.body;

    tittle = tittle?.trim();
    description = description?.trim();

    if (!tittle || !description) {
      return res.status(400).json({ message: "Ningún campo debe estar vacio" });
    }

    const payload = await tasksModel.findByIdAndUpdate(
      req.params.id,
      {
        tittle,
        description,
        dueDate,
        priority,
        status,
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

taskController.deleteTask = async (req, res) => {
  try {
    const response = await tasksModel.findByIdAndDelete(req.params.id);
    if (!response) return res.status(400).json({ message: "Data not found" });
    return res.status(200).json({ message: "Data eliminada correctamente" });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default taskController;
