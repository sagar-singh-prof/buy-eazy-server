import { Router } from "express";
import {
  allProductsController,
  filteredProductsController,
} from "../controllers/productController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();
router.use(verifyJWT);

router.get("/products", filteredProductsController);

export default router;
