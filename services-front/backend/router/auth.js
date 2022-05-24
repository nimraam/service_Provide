const express = require("express");
const db = require("../db/conn.js");
const bcrypt = require("bcrypt");
const jtoken = require("jsonwebtoken");
const User = require("../model/userschema");
const serviceprovider = require("../model/serviceprovider");

const service = require("../model/services");

const authenticate = require("../middleware/authenticate");

const router = express.Router();
//signup api
router.post("/register", async (req, res) => {
  if (req.body.role_id == "1") {
    const {
      last_name,
      first_name,
      username,
      email,
      password,
      role_id,
      gender,
      address,
      phone,
    } = req.body;
    //console.log(name);
    //console.log(email);
    if (
      !username ||
      !email ||
      !password ||
      !last_name ||
      !first_name ||
      !gender ||
      !address ||
      !phone
    )
      return res
        .status(422)
        .json({ Error: "email, username or password is missing" });

    try {
      const usercheck = await User.findOne({ email: email });
      const providercheck = await serviceprovider.findOne({ email: email });
      const usernamecheckprov = await serviceprovider.findOne({
        username: username,
      });
      const usernamecheck = await User.findOne({ username: username });
      if (usercheck && providercheck) {
        return res.status(422).json({ Error: "Email already exists" });
      }
      if (usernamecheck && usernamecheckprov) {
        return res.status(422).json({ Error: "Username already exists" });
      }
      if (gender.length > 1 && (gender !== "M" || gender !== "F")) {
        return res.status(411).json({ Error: "Gender's should be M or F" });
      }
      const nuser = new User({
        last_name,
        first_name,
        username,
        email,
        password,
        role_id,
        gender,
        address,
        phone,
      });
      const registered = await nuser.save();
      if (registered) {
        return res.status(201).json({ message: username + " user created" });
      } else {
        return res
          .status(418)
          .json({ Error: username + " Something bad happened" });
      }
    } catch (error) {
      res.json({ Error: error + "other type of errorS" });
    }
  } else if (req.body.role_id == "2") {
    const {
      last_name,
      first_name,
      username,
      email,
      password,
      role_id,
      gender,
      address,
      phone,
      hourlyrate,
      age,
      service_name,
    } = req.body;
    //console.log(name);
    //console.log(email);

    try {
      if(!last_name||!first_name||!username||!email||!password||!role_id||!gender||!address||!phone||!hourlyrate||!age||!service_name){
        return res.json({Error:"incomplete fields"})
      }
      const usercheckuser = await User.findOne({ email: email });
      const usercheck = await serviceprovider.findOne({ email: email });
      const usernamecheck = await serviceprovider.findOne({
        username: username,
      });
      const usernamecheckuser = await User.findOne({ username: username });
      if (usercheck && usercheckuser) {
        return res.status(422).json({ Error: "Email already exists" });
      }
      if (usernamecheck && usernamecheckuser) {
        return res.status(422).json({ Error: "Username already exists" });
      }
      if (gender.length > 1) {
        return res.status(411).json({ Error: "Gender's should be M or F" });
      }
      const nuser = new serviceprovider({
        last_name,
        first_name,
        username,
        email,
        password,
        role_id,
        gender,
        address,
        phone,
        hourlyrate,
        age,
        service_name,
      });
      const registered = await nuser.save();
      if (registered) {
        return res
          .status(201)
          .json({ message: username + " service provider created" });
      } else {
        return res
          .status(418)
          .json({ Error: username + " Something bad happened" });
      }
    } catch (error) {
      res.json({ Error: error });
    }
  } else {
    res.status(401).json({ Error: "Invalid rights" });
  }
  /*
  user
    .findOne({ email: email })
    .then((userexists) => {
      if (userexists)
        return res.status(422).json({ Error: "Email already exists" });
      const nuser = new User({ username, email, password });
      nuser
        .save()
        .then(() => {
          res.status(201).json({ Message: "user created" });
        })
        .catch((err) => {
          res.status(500).json({ Error: "failed to insert" });
        });
    })
    .catch((err) => {
      console.log(err);
    });*/
});
//admin api to get all customers
router.get("/customers", async (req, res) => {
  try {
    const users = await User.find(
      {},
      {
        password: 0,
        _id: 0,
        role_id: 0,
        tokens: 0,
        __v: 0,
      }
    );
    res.status(200).send(users);
  } catch (err) {
    res.status(404).json({ message: "not able to get data" });
  }
});
//ADMIN API TO DELETE A CUSTOMER
router.delete("/deletecustomer/:email", async (req, res) => {
  const { eemail } = req.params.email;
  try {
    let abc = await User.findOneAndDelete({ email: req.params.email });
    if (abc) {
      res.status(200).json({
        message: "Customer Deleted",
      });
    } else {
      res.status(200).json({
        message: "Customer Does not Exist",
      });
    }
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
});
router.delete("/deleteprovider/:email", async (req, res) => {
  const { eemail } = req.params.email;
  try {
    let abc = await serviceprovider.findOneAndDelete({
      email: req.params.email,
    });
    if (abc) {
      res.status(200).json({
        message: "Provider Deleted",
      });
    } else {
      res.status(200).json({
        message: "Provider Does not Exist",
      });
    }
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
});
//ADMIN API TO GET ALL SERVICE PROVIDERS
router.get("/serviceprovider", async (req, res) => {
  try {
    const users = await serviceprovider.find({},{tokens,});
    res.status(200).send(users);
  } catch (err) {
    res.status(404).json({ message: "not able to get data" });
  }
});
//ADMIN UPDATE API FOR UPDATING CUSTOMER
router.put("/updatecustomer/:email", async (req, res) => {
  const {
    last_name,
    first_name,
    gender,
    address,
    phone,
  } = req.body;
  try {
    let oemail = req.params.email;
    const doc = await User.findOneAndUpdate(
      { email: oemail },
      {
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        address: address,
        phone: phone,
      },
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).send(doc);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
});
//PROFILE API FOR CUSTOMER HIMSELF
router.get("/userdetails/:email", async (req, res) => {
  try {
    const Service_data=await serviceprovider.findOne({ email: req.params.email },
      {
        password: 0,
        _id: 0,
        role_id: 0,
        tokens: 0,
        appointments: 0,
        __v: 0,
      })
    const result = await User.findOne(
      { email: req.params.email },
      {
        password: 0,
        _id: 0,
        role_id: 0,
        tokens: 0,
        appointments: 0,
        __v: 0,
      }
    );
    if(result){
      res.status(200).send(result);
    }else if(Service_data){
      res.status(200).send(Service_data)
    }
  } catch (err) {
    res.status(404).json({ Error: "User not found" });
  }
});
router.put("/updatestatus/:email", async (req, res) => {
  let { userstatus, providerstatus, pemail } = req.body;
  const cemail = req.params.email;
  let d = new Date(req.body.date);
  let provdoc = await serviceprovider.findOne({ email: pemail });
  let usdoc = await User.findOne({ email: req.params.email });
  if (provdoc.length < 0 || usdoc.length < 0) {
    return res.status(200).send({ message: "incomplete request" });
  }
  try {
    const providerdoc = await serviceprovider.updateOne(
      { email: pemail },
      {
        $set: {
          "appointments.$[o].userstatus": req.body.userstatus,
          "appointments.$[o].providerstatus": req.body.providerstatus,
        },
      },
      {
        arrayFilters: [
          {
            "o.user_email": req.params.email,
            "o.provider_email": pemail,
            "o.date": d,
          },
        ],
      }
    );
    const userdoc = await User.updateOne(
      { email: cemail },
      {
        $set: {
          "appointments.$[o].userstatus": req.body.userstatus,
          "appointments.$[o].providerstatus": req.body.providerstatus,
        },
      },
      {
        arrayFilters: [
          {
            "o.user_email": req.params.email,
            "o.provider_email": pemail,
            "o.date": d,
          },
        ],
      }
    );
    res.status(200).send("Appointment-Created-Successfully");
  } catch (err) {
    return res.status(500).json({ err });
  }
});
//PROFILE API FOR PROVIDER HIMSELF
router.get("/providerdetails/:email", async (req, res) => {
  try {
    const result = await serviceprovider.findOne(
      { email: req.params.email },
      {
        password: 0,
        _id: 0,
        role_id: 0,
        tokens: 0,
        appointments: 0,
        __v: 0,
      }
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(404).json({ Error: "User not found" });
  }
});

//LOGIN API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      Error: "invalid credentials",
    });
  }
  try {
    let token;
    const userdoc = await User.findOne({ email: email });
    const servicedoc = await serviceprovider.findOne({ email: email });
    if (userdoc) {
      const passcheck = await bcrypt.compare(password, userdoc.password);
      token = await userdoc.generateAuthToken();
      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 2592000000),
        httpOnly: true,
      });

      if (!passcheck) {
        res.status(400).json({
          Error: "Invalid credential",
        });
      } else {
        await res.send({Message:"login successfully",emailu: email,role_id:userdoc.role_id, tokens: token });
        console.log({ emailu: email, tokens: token });
      }
    } else if (servicedoc) {
      console.log(servicedoc)
      const passcheck = await bcrypt.compare(password, servicedoc.password);
      token = await servicedoc.generateAuthToken();
      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 2592000000),
        httpOnly: true,
      });
      if (!passcheck) {
        res.status(400).json({
          Error: "Invalid credential",
        });
      } else
        await res.status(200).send({
          Message: "login successful",
          role_id: servicedoc.role_id,
          emailu: email, tokens: token
        });

    } else {
      res.status(400).json({
        Error: "Invalid credential",
      });
    }
  } catch (err) {
    res.status(500).json({ Error: "Error occurred" });
  }
});
//RETRIEVE API FOR PROVIDER TO VIEW HIS AVAILABILITIES
router.get("/availabilitiesemail/:email", async (req, res) => {
  try {
    const resultdoc = await serviceprovider.findOne(
      { email: req.params.email },
      {
        password: 0,
        _id: 0,
        role_id: 0,
        tokens: 0,
        email:0,
        appointments: 0,
        username: 0,
        password: 0,
        last_name: 0,
        first_name: 0,
        gender: 0,
        hourlyrate: 0,
        service_name: 0,
        phone: 0,
        age: 0,
        address: 0,
        __v: 0,
      }
    );
    if (resultdoc) {
      res.status(200).send(resultdoc.availabilities);
    } else res.status(404).json({ error: "Provider email does not exist" });
  } catch (err) {
    res.status(500).json({ Error: "some error occured" });
  }
});
//API FOR UPDATING AND MAKING PROVIDERS' AVAILABILITIES
router.put("/updateavailabilities/:email", async (req, res) => {
  const { date } = req.body;
  if (!date) {
    return res.status(401).json({ Error: "request incomplete" });
  }
  try {
    const provcheck = await serviceprovider.findOneAndUpdate(
      { email: req.params.email },
      {
        $addToSet: {
          availabilities: new Date(date),
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    if (provcheck) {
      res.status(200).send({provcheck});
    }
  } catch (e) {
    return res.status(501).json({ error: Error });
  }
});
//API FOR DELETING PROVIDERS AVAILABILITIES
router.put("/deleteavailabilities/:email", async (req, res) => {
  const { date } = req.body;
  if (!date) {
    return res.status(401).json({ Error: "request incomplete" });
  }
  try {
    const provcheck = await serviceprovider.findOneAndUpdate(
      { email: req.params.email },
      {
        $pull: {
          availabilities: new Date(date),
        },
      }
    );
    if (provcheck) {
      return res
        .status(200)
        .send({ message: "availability - successfully - deleted" });
    } else {
      return res.status(200).send({ message: "email doesn't exist" });
    }
  } catch (e) {
    return res.status(501).json({ error: Error });
  }
});
//API FOR VIEWING APPOINTMENTS FOR BOTH CUSTOMER AND PROVIDER
router.get("/appointmentemail/:email", async (req, res) => {
  try {
    const usercheck = await User.find(
      { email: req.params.email },
      {
        email: 0,
        password: 0,
        _id: 0,
        role_id: 0,
        tokens: 0,
        username: 0,
        password: 0,
        last_name: 0,
        first_name: 0,
        gender: 0,
        phone: 0,
        age: 0,
        address: 0,
        __v: 0,
      }
    );

    const provcheck = await serviceprovider.find(
      { email: req.params.email },
      {
        email: 0,
        password: 0,
        _id: 0,
        role_id: 0,
        tokens: 0,
        username: 0,
        password: 0,
        last_name: 0,
        first_name: 0,
        gender: 0,
        hourlyrate: 0,
        service_name: 0,
        phone: 0,
        age: 0,
        address: 0,
        __v: 0,
        availabilities: 0,
      }
    );

    if (usercheck.length > 0) {
      res.status(200).json(usercheck[0].appointments);
    } else if (provcheck.length > 0) {
      res.status(200).json(provcheck[0].appointments);
    } else {
      return res.status(404).json({ Message: "email does not exist" });
    }
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});
//API FOR MAKING AN APPOINTMENT WHEN CUSTOMER PUTS A REQUEST FOR A PROVIDER
// router.put("/makeappointment/:email", async (req, res) => {
//   let { instructions, date, pemail } = req.body;
//   console.log(req.params)
//   console.log(req.body);
//   let d = new Date(req.body.date);
//   console.log(d);
//   try {
//     let provdoc = await serviceprovider.findOne({ email: pemail });
//     //  console.log(provdoc + " seperate doc\n");
//     let usdoc = await User.findOne({ email: req.params.email });
//     //console.log(usdoc + " us doc\n");
//     const providerdoc = await serviceprovider.findOneAndUpdate(
//       {
//         email: pemail,
//       },
//       {
//         $addToSet: {
//           appointments: {
//             provider_email: req.body.pemail,
//             user_email: req.params.email,
//             date: d,
//             totalbill: provdoc.hourlyrate,
//             instruction: req.body.instructions,
//           },
//         },
//       }
//     );
//     const userdoc = await User.findOneAndUpdate(
//       { email: req.params.email },
//       {
//         $addToSet: {
//           appointments: {
//             provider_email: req.body.pemail,
//             user_email: req.params.email,
//             date: d,
//             totalbill: provdoc.hourlyrate,
//             instruction: req.body.instructions,
//           },
//         },
//       },
//       {
//         upsert: true,
//         new: true,
//       }
//     );
//     res.status(200).json({message:"Appointment-Created-Successfully"});
//   } catch (err) {
//     return res.status(500).json({ Error: "some error occured" });
//   }
// });
router.put("/makeappointment/:email", async (req, res) => {
  let { instructions, dates, pemail } = req.body;
  console.log(req.body);
  let d = new Date(req.body.date);
  console.log(d);
  try {
    let provdoc = await serviceprovider.findOne({ email: pemail });
    //  console.log(provdoc + " seperate doc\n");
    let usdoc = await User.findOne({ email: req.params.email });
    //console.log(usdoc + " us doc\n");
    const providerdoc = await serviceprovider.findOneAndUpdate(
      {
        email: pemail,
      },
      {
        $addToSet: {
          appointments: {
            provider_email: req.body.pemail,
            user_email: req.params.email,
            date: d,
            totalbill: provdoc.hourlyrate,
            instruction: req.body.instructions,
            userstatus: req.body.userstatus,
            providerstatus: req.body.providerstatus,
          },
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    const userdoc = await User.findOneAndUpdate(
      { email: req.params.email },
      {
        $addToSet: {
          appointments: {
            provider_email: req.body.pemail,
            user_email: req.params.email,
            date: d,
            totalbill: provdoc.hourlyrate,
            instruction: req.body.instructions,
            userstatus: req.body.userstatus,
            providerstatus: req.body.providerstatus,
          },
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    res.status(200).send("Appointment-Created-Successfully");
  } catch (err) {
    return res.status(500).json({ Error: "some error occured" });
  }
});
//takes in provider email and customer email and deletes the appointment
router.patch("/deleteappointment/:pemail/:email", async (req, res) => {
  let d = new Date(req.body.date);
  try {
    const providerdoc = await serviceprovider.findOneAndUpdate(
      {
        email: req.params.pemail,
      },
      {
        $pull: {
          appointments: {
            date: d,
          },
        },
      }
    );
    const userdoc = await User.findOneAndUpdate(
      { email: req.params.email },
      {
        $pull: {
          appointments: {
            date: d,
          },
        },
      }
    );
    res.status(200).send("Appointment-Deleted-Successfully");
  } catch (e) {
    return res.status(500).json({ Error: "some error occured" });
  }
});
router.put("/updateprovider/:email", async (req, res) => {
  const {
    nemail,
    last_name,
    first_name,
    username,
    gender,
    address,
    phone,
    hourlyrate
  } = req.body;
  try {
    let oemail = req.params.email;
    const doc = await serviceprovider.findOneAndUpdate(
      { email: oemail },
      {
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        address: address,
        phone: phone,
        hourlyrate: hourlyrate,
      },
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).send(doc);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
});
router.get('/getServiceProvider',async(req,res)=>{
  try {
    const Service_data=await serviceprovider.find({},{password:0,role_id:0,availabilities:0, appointments:0 ,tokens:0})
      res.status(200).json(Service_data)
  } catch (error) {
res.status(200).json({Error:error})
  }

})
//takes in date and service type and then returns providers satisfying both criteria
// router.post("/getproviders/:service", async (req, res) => {
//   let d = new Date(req.body.date);
//   console.log(d)
//   try {  
//     const providerdoc = await serviceprovider.find({
//       service_name: req.params.service,
//       availabilties: d,
//     },{tokens:0});
//     if (providerdoc.length > 0) {
//       return res.status(200).send(providerdoc);
//     } else {
//       return res.status(200).json({Error:"No Service Provider Available"});
//     }
//     res.status(200).json({Error:"Appointment-Deleted-Successfully"});
//   } catch (e) {
//     return res.status(500).json({ Error: "some error occured" });
//   }
// });   
router.post("/getproviders/:service", async (req, res) => {
  let d = new Date(req.body.date);
  console.log(d);
  try {
    const providerdoc = await serviceprovider.find(
      {
        service_name: req.params.service,
        availabilities: { $in: [d] },
      },
      { appointments: 0, tokens: 0 }
    );
    if (providerdoc.length > 0) {
      return res.status(200).send(providerdoc);
    } else {
      return res
        .status(200)
        .json({ Message: "No Service Provider Available on the given date" });
    }
  } catch (e) {
    return res.status(500).json({ Error: "some error occured" });
  }
});
//gets all the services
router.get("/services", async (req, res) => {
  try {
    const serv = await service.find({});
    if (serv) return res.status(200).send(serv);
    else return res.status(200).send({ message: "no service exist" });
  } catch (e) { 
    console.log(e)
  }
});
router.post("/services/:service1", async (req, res) => {
  try {
    const serv = new service({
      service_name: req.params.service1,
    });
    const sav = await serv.save();
    if (serv) return res.status(200).send(serv);
    else return res.status(200).send({ message: "Error" });
  } catch (e) {
    return res.status(500).send({ message: e });
  }
});
//deletes a service
router.delete("/services/:service", async (req, res) => {
  try {
    const serv = await service.findOneAndDelete({
      service_name: req.params.service,
    });
    if (serv) return res.status(200).send({ message: "service deleted" });
    else return res.status(200).send({ message: "Error" });
  } catch (e) {
    return res.status(500).send({ message: e });
  }
});

router.get("/", authenticate, (req, res) => {
  res.send(req.rootuser);
  console.log("User Identified");
});
module.exports = router;
