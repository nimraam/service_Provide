const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookies_parser=require('cookie-parser')

const User = require("./model/userschema");
env.config({ path: "config.env" });
require("./db/conn.js");
app.use(cookies_parser())
app.use(cors());
app.use(express.json());
app.use(require("./router/auth"));
const PORT = process.env.port;

app.get("/login", (req, res) => {
  res.send("Login here");
});
app.post("/Signup", (req, res) => {
  res.send("Signup here");
});
app.listen(PORT, () => {
  console.log("server up at localhost" + " " + PORT);
});
