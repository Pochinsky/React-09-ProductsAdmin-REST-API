import { exit } from "node:process";
import colors from "colors";
import db from "../config/db";

const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log(colors.cyan("Datos eliminados correctamente"));
    exit();
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

if (process.argv[2] === "--clear") clearDB();
