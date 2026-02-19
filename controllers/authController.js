import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export async function registerController(req, res) {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ status: false, message: "All fields are required" });
  }

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    return res.status(201).json({ status: true, message: "success" });
  } catch (error) {
    console.log(error, "inside db catch");
    return res.status(400).json({ status: false, message: error.message });
  }
}

export async function loginController(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ status: false, message: "invalid username or password" });
    if (user.password === password) {
      const jwt = generateToken(email);
      return res
        .status(200)
        .json({ status: true, message: "login success", jwt });
    } else
      return res
        .status(400)
        .json({ status: false, message: "invalid username or password" });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
}

export async function userController(req, res) {
  const { email } = req.params;
  if (!email)
    return res
      .status(400)
      .json({ status: false, message: "user id not present" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ status: false, message: "No user found" });

    return res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
}
