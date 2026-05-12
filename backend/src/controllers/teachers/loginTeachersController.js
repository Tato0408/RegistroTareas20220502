import teacherModel from "../../models/teachers.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../../config.js";

const loginTeachersController = {};

loginTeachersController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const payload = await teacherModel.findOne({ email });
    if (!payload) return res.status(400).json({ message: "Email not found" });
    if (payload.timeOut && payload.timeOut > Date.now())
      return res.status(400).json({ message: "Account bloqued" });
    const isMatch = await bcrypt.compare(password, payload.password);
    if (!isMatch) {
      payload.loginAttemps = (payload.loginAttemps || 0) + 1;
      if (payload.loginAttemps >= 5) {
        payload.timeOut = Date.now() + 15 * 60 * 1000;
        payload.loginAttemps = 0;
        await payload.save();
        return res.status(400).json({ message: "Cuenta bloqueada" });
      }
    }
    payload.loginAttemps = 0;
    payload.timeOut = 0;
    await payload.save();
    const token = jsonwebtoken.sign(
      { id: payload._id, userType: "Teacher" },
      config.JWT.secret,
      { expiresIn: "30d" },
    );
    res.cookie("authCookie", token);
    return res.status(200).json({ message: "Login succesful" });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default loginTeachersController;
