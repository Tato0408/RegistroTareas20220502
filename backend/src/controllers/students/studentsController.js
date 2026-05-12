import studentsModel from "../../models/students.js";
const studentsController = {};

studentsController.getStudents = async (req, res) => {
  try {
    const response = await studentsModel.find();
    return res.status(200).json(response);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

studentsController.updateStudents = async (req, res) => {
  try {
    let {
      name,
      lastName,
      email,
      password,
      bithDate,
      phone,
      grade,
      isVerified,
      loginAttemps,
      timeOut,
    } = req.body;

    name = name?.trim();
    lastName = lastName?.trim();
    email = email?.trim();
    password = password?.trim();

    if(!name || !lastName || !email || password){
        return res.status(400).json({message: "Ningún campo debe estar vacio"})
    }

    const payload = await studentsModel.findByIdAndUpdate(req.params.id, {
        name,
      lastName,
      email,
      password,
      bithDate,
      phone,
      grade,
      isVerified,
      loginAttemps,
      timeOut,
    }, {new: true})
    if(!payload) return res.status(400).json({message: "Field required"})
    return res.status(200).json({message: "Datos actualizados correctamente"})
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

studentsController.deleteStudent = async(req, res) =>{
    try {
        const response = await studentsModel.findByIdAndDelete(req.params.id)
        if(!response) return res.status(400).json({message: "Data not found"})
            return res.status(200).json({message: "Data eliminada correctamente"})
    } catch (error) {
        
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
    }
}

export default studentsController;
