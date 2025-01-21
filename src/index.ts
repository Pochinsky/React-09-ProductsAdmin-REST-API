import colors from "colors";
import server from "./server";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(colors.cyan(`REST API running in port: ${port}`));
});
