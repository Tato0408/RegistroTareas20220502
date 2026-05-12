import topicModel from "../../models/topics.js";
const topicController = {};

topicController.getTopic = async (req, res) => {
  try {
    const response = await topicModel.find();
    return res.status(200).json(response);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

topicController.insertTopic = async (req, res) => {
  try {
    let { subjectName, isAviable, teacherId } = req.body;

    if (!subjectName) {
      return res.status(400).json({ message: "Ningún campo debe estar vacio" });
    }
    const payload = new topicModel({
      subjectName,
      isAviable,
      teacherId,
    });
    await payload.save();
    return res.status(200).json({ message: "Data save" });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

topicController.updateTopic = async (req, res) => {
  try {
    let { subjectName,
    isAviable,
    teacherId } = req.body;

    subjectName = subjectName?.trim();

    if (!subjectName) {
      return res.status(400).json({ message: "Ningún campo debe estar vacio" });
    }

    const payload = await topicModel.findByIdAndUpdate(
      req.params.id,
      {
        subjectName,
    isAviable,
    teacherId
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

topicController.deleteTopic = async (req, res) => {
  try {
    const response = await topicModel.findByIdAndDelete(req.params.id);
    if (!response) return res.status(400).json({ message: "Data not found" });
    return res.status(200).json({ message: "Data eliminada correctamente" });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default topicController;
