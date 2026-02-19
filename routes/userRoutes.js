import { Router } from "express";
import {
  loginController,
  registerController,
  userController
} from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();



router.post("/login", loginController);

router.post("/register", registerController);

router.get("/user/:email", verifyJWT, userController)

export default router;
