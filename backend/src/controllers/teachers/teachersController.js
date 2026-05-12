import teachrModel from "../../models/teachers.js";
const teacherController = {};

teacherController.getTeachers = async (req, res) => {
  try {
    const response = await teachrModel.find();
    return res.status(200).json(response);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

teacherController.updateTeacher = async (req, res) => {
  try {
    let {
      nameTeacher,
      lastName,
      email,
      password,
      phone,
      speciality,
      isActive,
      isVerified,
      loginAttemps,
      timeOut,
    } = req.body;

    nameTeacher = nameTeacher?.trim();
    lastName = lastName?.trim();
    email = email?.trim();
    password = password?.trim();

    if (!nameTeacher || !lastName) {
      return res.status(400).json({ message: "Ningún campo debe estar vacio" });
    }

    const payload = await teachrModel.findByIdAndUpdate(
      req.params.id,
      {
        nameTeacher,
        lastName,
        email,
        password,
        phone,
        speciality,
        isActive,
        isVerified,
        loginAttemps,
        timeOut,
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

teacherController.deleteTeacher = async (req, res) => {
  try {
    const response = await teachrModel.findByIdAndDelete(req.params.id);
    if (!response) return res.status(400).json({ message: "Data not found" });
    return res.status(200).json({ message: "Data eliminada correctamente" });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default teacherController;
