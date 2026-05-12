import teacherModel from "../../models/teachers.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer'
import { config } from "../../../config.js";
import jsonwebtoken from "jsonwebtoken";
const recoveryPasswordTeacherController = {};

recoveryPasswordTeacherController.requestCode = async (req, res) => {
  try {
    const { email } = req.body;
    const userFound = await teacherModel.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });
    const randomCode = crypto.randomBytes(3).toString("hex");
    const token = jsonwebtoken.sign(
      { email, randomCode, userType: "Teacher", verified: false },
      config.JWT.secret,
      { expiresIn: "15m" },
    );

    res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000 });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Recuperación de contraseña",
      text: "Código: " + randomCode,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("ERROR: ", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      return res.status(200).json({ message: "Email sent" });
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

recoveryPasswordTeacherController.verifyCode = async (req, res) => {
  try {
    const { code } = req.body;
    const token = req.cookies.recoveryCookie;
    const decode = jsonwebtoken.verify(token, config.JWT.secret);

    if (code !== decode.randomCode)
      return res.satus(400).json({ message: "Invalid code" });
    const newToken = jsonwebtoken.sign(
      { email: decode.email, userType: "Teacher", verified: true },
      config.JWT.secret,
      { expiresIn: "15m" },
    );
    res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000 });
    return res.status(200).json({ message: "Valid code" });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

recoveryPasswordTeacherController.newPassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    if (password !== newPassword)
      return res
        .status(400)
        .json({ message: "Laas contraseñas deben ser iguales " });
    const token = req.cookies.recoveryCookie;
    const decode = jsonwebtoken.verify(token, config.JWT.secret);
    if (!decode.verified)
      return res.status(400).json({ message: "Code not verified" });
    const passwordHashed = await bcrypt.hash(newPassword, 10);
    await teacherModel.findOneAndUpdate(
      { email: decode.email },
      { password: passwordHashed },
    );
    res.clearCookie("recoveryCookie");
    return res.status(200).json({ message: "Password good" });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default recoveryPasswordTeacherController;
