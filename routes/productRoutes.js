import { Router } from "express";
import {
  addProductCOntroller,
  allProductsController,
  filteredProductsController,
} from "../controllers/productController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({ storage });


const router = Router();
router.use(verifyJWT);

router.get("/products", filteredProductsController);
router.post("/products",upload.single("imageFile"),addProductCOntroller)

export default router;
