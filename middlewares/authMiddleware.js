import jwt from "jsonwebtoken";


const secret="122506"

export const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("token is", token)

    const decoded = jwt.verify(token, secret);

    // attach decoded user data
    req.user = decoded;

    next();

  } catch (err) {
    console.log("errorwhile token",err.message)
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};