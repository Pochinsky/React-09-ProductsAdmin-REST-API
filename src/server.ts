import express from "express";
import colors from "colors";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Connect to db
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.green("Server connected to DB"));
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
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;
