import studentsModel from "../../models/students.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../../config.js";
import crypto from "crypto";
import * as nodemailer from "nodemailer";

const registerStudentsController = {};

registerStudentsController.insertSudent = async (req, res) => {
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

    if (!name || !lastName || !email || password) {
      return res.status(400).json({ message: "Ningún campo debe estar vacio" });
    }

    const existStudent = await studentsModel.findOne({ email });
    if (existStudent)
      return res.status(400).json({ message: "Student alredy exist" });

    const passwordHashed = await bcrypt.hash(password, 10);
    const randomCode = crypto.randomBytes(3).toString("hex");
    const token = jsonwebtoken.sign(
      {
        randomCode,
        name,
        lastName,
        email,
        password: passwordHashed,
        bithDate,
        phone,
        grade,
        isVerified,
        loginAttemps,
        timeOut,
      },
      config.JWT.secret,
      {
        expiresIn: "15m",
      },
    );

    res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 100 });

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
      subject: "Verificación de cuenta",
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

registerStudentsController.verifyCode = async (req, res) => {
  try {
    const { verifyCodeRequest } = req.body;
    const token = req.cookies.registrationCookie;
    const decode = jsonwebtoken.verify(token, config.JWT.secret);
    const { randomCode : storedCode } = decode;

    if (verifyCodeRequest !== storedCode)
      return res.status(400).json({ message: "Invalid Code" });
    const payload = new studentsModel({
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
    });
    await payload.save();
    return res.status(200).json({message:"Data save"})
  } catch (error) {
    
    console.log("ERROR: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default registerStudentsController;
