import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/easy-buy");
    console.log("MongoDb connected");
  } catch (err) {
    console.log("error while connecting db", err);
    process.exit(1);
  }
};

export default connectMongo;
