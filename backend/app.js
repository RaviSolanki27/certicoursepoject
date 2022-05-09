const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const { PORT } = require("./config/connection");
const routers = require("./router/routes");
require("./db/conn");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const port = PORT || 5000;
app.use("/", routers);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
