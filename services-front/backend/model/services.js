const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const servicesschema = new mongoose.Schema({
  service_name:{
      type:String
  }
});
const service = mongoose.model("SERVICES", servicesschema);
module.exports = service;
