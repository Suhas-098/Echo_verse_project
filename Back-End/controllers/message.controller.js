import Messsage from "../models/messages.js";
import User from "../models/user.js";


export const getAllContacts=async(req,res)=>{
    try {
const loggedInUserId=req.user._id; 
const filteredUsers= await User.find({_id:{$ne:loggedInUserId}}).select("-password");

res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in getAllcontacts:",error);
        res.status(500).json({message:"server error"});
        
    }
};