const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')


const JWT_SECRET = "Harryisagood$oy"
//Route1 :Create a User using: POST "/api/auth/createuser" no login required
router.post('/createuser', [
  body('name', "Enter a valid name").isLength({ min: 3 }),
  body('email', "Enter a valid email").isEmail(),
  body('password', "Password must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
  let success=false;
  // If there are errros return bad request and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }
  try {
    // Check user with this email exist already

    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exist" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // Creating a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })

    //Sending the user as a response
    const data = {
      user: {
        id: user.id
      }
    }
    success=true;
    const authToken = jwt.sign(data, JWT_SECRET)
    console.log(authToken)
    res.json({ success,authToken });

  } catch (error) {
    success=false;
    console.log(error.message);
    res.status(500).send("Internal server error, success:",success)
  }

})
//Route2: Authenticate a user using: POST "/api/auth/login" .No login required
router.post('/login', [
  body('email', "Enter a valid email").isEmail(),
  body('password', "Password can not be blank").exists(),

], async (req, res) => {
  let success=false;
  // If there are errros return bad request and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user =await  User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with credit credentials" });
    }
    // const passwordCompare = bcrypt.compare(password, user.password);
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      success=false
      return res.status(400).json({success, error: "Please try to login with credit credentials" });
    }
    const data = {  
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    success=true

    res.send({ success,authToken })
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error")
  }
})

//ROUTE 3: Get loggedin User Details using POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId }).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});
module.exports = router
