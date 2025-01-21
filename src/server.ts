import express from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";

// Connect to db
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.green("Server connected to DB"));
  } catch (error) {
    console.log(error);
    console.error(colors.red("Server failed to connect to DB"));
  }
}
connectDB();

// Server setup
const server = express();

server.use(express.json());
server.use("/api/products", router);

export default server;
