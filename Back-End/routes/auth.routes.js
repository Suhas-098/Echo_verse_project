import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

const router = express.Router();


// ------- SiGNUP ROUTE --------
router.post("/signup", async (req, res) => {
  try {
    const { FullName, Email, Password } = req.body;

    // Validation
    if (!FullName || !Email || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (Password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EmailRegex.test(Email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

      //password Validation
    const salt =await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(Password,salt)

    // Creating new user
    const newUser = new User({ FullName, Email, Password:hashedPassword });

    if(newUser){
      generateToken(newUser._id,res)
      await newUser.save();
     res.status(201).json({ _id:newUser._id,
      FullName:newUser.FullName,
      Email:newUser.Email,
      profilepic:newUser.profilepic,
    });

    //todo send a welcome email to user

      }else{
        res.status(400).json({message:"Invaild user data"});
      }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});



// ------- LOGIN ROUTE --------
router.post("/login", async(req, res) => {
  const{Email,Password}=req.body
  try{
    const user=await User.findOne({Email});
    if(!user) return res.status(400).json({message:"Invalid Credentials"});
      
    const isPasswordCorrect=await bcrypt.compare(Password,user.Password)
    if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"});

    generateToken(user._id,res)
    res.status(200).json({
      _id:user._id,
      FullName:user.FullName,
      Email:user.Email,
      Profilepic:user.Profilepic,
    });
  }
 catch (error) {
    console.error("Error in login controller:",error);
    return res.status(500).json({ message: "Server error" });
  }
            
});



// ------- LOGOUT ROUTE --------
router.post("/logout", (_,res) => {
res.cookie("jwt","",{maxAge:0});
res.status(200).json({ message: "Logged out successfully" });

  
});


















export default router;