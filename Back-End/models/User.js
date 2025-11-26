import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    Email: {
        type: String,
        required: true,
        unique: true,
    },
    FullName: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: 6,
    },
    Profilepic: {
        type: String,
        default: "",
    },


},
    { timestamps: true }
);


const User = mongoose.model("User", userSchema);

export default User;