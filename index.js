import express from "express";
import connectMongo from "./config/db.js";
import authRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
const app = express();
const port = 3000;

//connection of mongo
console.log("hello");

const startServer = async () => {
  await connectMongo();

  app.use(cors());
  app.use(express.json());
  app.use("/", authRoutes);
  app.use("/", productRoutes);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};

startServer();

//creating the schema
