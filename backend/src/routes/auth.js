const express = require("express");
const { signup, signin } = require("../controllers/auth");
const { json } = require("body-parser");
const router = express.Router();
const {  isRequestValidated, validateSignupRequest, validateSigninRequest } = require("../validatios/auth");

router.post("/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/signin", validateSigninRequest, isRequestValidated, signin);

// router.post("/profile", requireSignin,(req,res)=>{
//     res.status(200).json({
//         user: 'profile'
//     });
// });
module.exports = router;
