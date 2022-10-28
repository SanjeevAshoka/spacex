const express = require('express');
const User = require('../models/User');
const router= express.Router();
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser =require('../middleware/fetchUser');

const JWT_secret = 'sanjeev@';

//Route 1:  Create a user using: POST "/api/auth/createuser"  -> Doesn't require auth
router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 8 }),

    ],async  (req,res)=>{
      // if there is errors return bad json, with message
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });}
    // console.log(req.body);
    // const user = User(req.body);
    // user.save()
    try{
      let user  = await User.findOne({email: req.body.email});
      if(user) return  res.status(400).json({errror: "Already a user exist"}); 
      const salt =await  bcrypt.genSalt(10);
      let securePass = await bcrypt.hash(req.body.password, salt); 
      user= await User.create({
         name: req.body.name,
         email: req.body.email,
         password: securePass,
       })
       const data = { user: { id: user.id}}
       const jwttocken = jwt.sign(data, JWT_secret);
      //  res.json({jwttocken})
       res.json({jwttocken:jwttocken, Success: true, message: "The user has been created"});
       // .then(user => res.json(user))
       // .catch((err)=> {console.log(err); res.send('email should be unique')});
     // res.send(req.body);
    }
    catch(error){
      console.log("Error: ",error);
      res.status(500).json({Success: false, message:"Some Error Occured"});
    }

});
//Route 2:  Authenticate a user using: POST "/api/auth/login"  -
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
  ],async  (req,res)=>{
    // if there are errors , retrun bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });}
    
    const {email, password } = req.body;
    try{
      let user =await  User.findOne({email});
      if(!user)  res.status(400).json({error: "Login with correct credentials"});

      const passCompare = await bcrypt.compare(password, user.password );
      if(!passCompare){
        res.status(400).json({error: "Login with correct credentials"});
        }
        const data = { user: { id: user.id}}
        const jwttocken = jwt.sign(data, JWT_secret);
       let Success= true;
        res.json({Success,jwttocken})

    }
    catch(error){
      console.log("Error: ",error);
      res.status(500).json({Success:false,error:"Internal server Error Occured"});
    }
  });

//Route 2:  Get logged in User details using: POST "/api/auth/getUser"  - Login Required.
router.post('/getuser',fetchUser, [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
  ],async  (req,res)=>{
try {
    const userId = req.user.id;
    const user =await  User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
  console.log("Error: ",error);
  res.status(500).send("Internal server Error Occured");
}});
module.exports = router;