import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

dotenv.config();

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

// Express instance
const server = express();

// Allow connections
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("CORS Error"));
    }
  },
};
server.use(cors(corsOptions));

// Read data from forms
server.use(express.json());

// Routes
server.use("/api/products", router);

// REST API Docs endpoints
server.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
