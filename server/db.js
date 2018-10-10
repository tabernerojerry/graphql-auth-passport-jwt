import mongoose from "mongoose";
import { config } from "dotenv";

config({ path: "variables.env" });

const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export default (() =>
  mongoose
    .connect(
      MONGO_URL,
      { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB Connected!"))
    .catch(error => console.log(`MongoDB Error: ${error}`)))();
