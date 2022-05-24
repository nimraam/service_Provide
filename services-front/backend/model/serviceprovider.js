const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const serviceproviderscehma = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  rating: {
    type: String,
  },
  role_id: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    minlength: 1,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  hourlyrate: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  service_name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  availabilities: [Date],
  appointments: [
    {
      provider_email: {
        type: String,
      },
      user_email: {
        type: String,
      },
      date: {
        type: Date,
      },
      userstatus: {
        type: String,
        default: "pending",
      },
      providerstatus: {
        type: String,
        default: "pending",
      },
      totalbill: {
        type: Number,
        default: 0,
      },
      instruction: {
        type: String,
      },
    },
  ],
});

serviceproviderscehma.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
serviceproviderscehma.methods.generateAuthToken = async function () {
  try {
    let tokengen = jwt.sign({ _id: this._id }, process.env.SECRETKEY);
    this.tokens = this.tokens.concat({ token: tokengen });
    await this.save();
    return tokengen;
  } catch (err) {
    console.log(err);
  }
};
const serviceprovider = mongoose.model(
  "SERVICEPROVIDER",
  serviceproviderscehma
);
module.exports = serviceprovider;
