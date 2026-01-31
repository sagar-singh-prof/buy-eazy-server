import express from "express";
import connectMongo from "./config/db.js";
import authRoutes from "./routes/userRoutes.js";
const app = express();
const port = 3000;

//connection of mongo
console.log("hello");

const startServer = async () => {
  await connectMongo();

  app.use(express.json());
  app.use("/", authRoutes);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};

startServer();

//creating the schema
