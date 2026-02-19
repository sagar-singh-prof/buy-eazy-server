import jwt from "jsonwebtoken";

const secret="122506"
export const generateToken = (email) => {
  return jwt.sign({ email },secret, { expiresIn: "1h" });
};
