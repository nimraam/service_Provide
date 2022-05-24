const jwt = require("jsonwebtoken");
const User = require("../model/userschema");
const serviceprovider = require("../model/serviceprovider");
const service = require("../model/services");
const authenticate =async (req, res, next) => {
  try {
    // const {jwttoken} = req.cookies;
    // const verify = jwt.verify(jwttoken, process.env.SECRETKEY);
    // const rootuser = await User.findOne({
    //   _id:verify._id,
    //   "tokens.token": jwttoken,
    // });
   
    // if (!rootuser) {
    //   throw new Error("User not found");
    // }
    // req.token = jwttoken;
    // req.rootuser = rootuser;
    // req.userid = rootuser._id;
    // next();
  } catch (err) {
    res.status(401).send("Unauthorized");
    console.log(err);
  }
};
module.exports = authenticate;
