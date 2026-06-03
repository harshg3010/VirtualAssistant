import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// signup

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already Exits!" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password Must Be At least Greater 6 Characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      password: hashedPassword,
      email,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    }); // for 7 day

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `SignUp Error ${error}` });
  }
};

// login

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email Does not Exits!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is Wrong" });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    }); // for 7 day

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Login Error ${error}` });
  }
};

// logout

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successfully !" });
  } catch (error) {
    return res.status(500).json({ message: `Logout Error ${error}` });
  }
};
