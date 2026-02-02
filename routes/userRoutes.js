import { Router } from "express";
import {
  loginController,
  registerController,
  userController
} from "../controllers/authController.js";

const router = Router();

router.post("/login", loginController);

router.post("/register", registerController);

router.get("/user/:email", userController)

export default router;
