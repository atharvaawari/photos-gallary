import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config();

//DB create and Connection
// 1. setup project in mongodb atlas by creating new Project , add cluster, add netwrok access(allow all with caution not recomend for production)
//2. get connection string from atlas (remove forward slash if you add in connection function)


const connectDB = async ()=>{
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n MONGODB connected!! DB HOST: ${connectionInstance.connection.host}`)
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
}

export default connectDB;