const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/products", require("./products"));

app.listen(8800, () => {
  console.log("Connect to backend.");
});
