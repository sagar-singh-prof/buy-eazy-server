import User from "../models/User.js";

export async function registerController(req, res) {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    return res.status(201).json({ message: "success" });
  } catch (error) {
    console.log(error, "inside db catch");
    return res.status(400).json({ message: error.message });
  }
}

export async function loginController(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ status: false, message: "invalid username or password" });
    console.log(user);
    if (user.password === password)
      return res.status(200).json({ status: true, message: "login success" });
    else
      return res
        .status(400)
        .json({ status: false, message: "invalid username or password" });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
}
