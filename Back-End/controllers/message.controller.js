import cloudinary from "../lib/cloudinary.js";
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



export const getMessagesByUserId=async(req,res)=>{
try {
    const myId =req.user._id;
    const {id:userToChatId}= req.params

    const message=await Messsage.find({
        $or:[
            {senderId:myId, receiverId: userToChatId},
            {senderId:userToChatId, receiverId: myId},
            ],
    });
    res.status(200).json(message);
} catch (error) {
    console.log("Error in getMessages controller:",error.message);
    res.status(500).json({message:"Error in getMessagesByUserId"});
}
};



export const sendMessage=async(req,res)=>{
try {
    const {text,image}=req.body;
    const {id:receiverId}=req.params;
    const senderId =req.user._id;

    let imageUrl;
    if(image){
        const uploadResponse =await cloudinary.uploader.upload(image);
        imageUrl=uploadResponse.secure_url;
    }

    const newMessage =new Messsage({
        senderId,
        receiverId,
        text,
        image:imageUrl,
    });

    await newMessage.save()

    //to do socket.io

    res.status(201).json(newMessage);
} catch (error) {
   console.log("Error in getMessages controller:",error.message);
    res.status(500).json({message:"Error in sendMessage"});  
}
};



export const getChatPartners=async(req,res)=>{
try {
    const loggedInUserId=req.user._id;

    //find all the messages where the logged-in user is either sender or receiver
    const messages = await Messsage.find({
        $or: [{senderId:loggedInUserId},{receiverId:loggedInUserId}],
    });

    const chatPartnerIds = [...new Set(messages.map((msg)=>
        msg.senderId.toString() ===loggedInUserId.toString() ? msg.receiverId.toString(): msg.senderId.toString()
    )),
];

const chatPartners =await User.find({_id: {$in:chatPartnerIds}}).select("-Password");

res.status(200).json(chatPartners);

} catch (error) {
    console.error("Error in getChatPartners: ",error.message);
    res.status(500).json({error: "Internal Server error in getChatPartners"});
}
};