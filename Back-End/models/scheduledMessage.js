import mongoose from "mongoose";

const scheduledMessageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            trim: true,
            maxlength: 2000,
        },
        image: {
            type: String,
        },
        scheduledAt: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "sent", "failed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const ScheduledMessage = mongoose.models.ScheduledMessage || mongoose.model(
    "ScheduledMessage",
    scheduledMessageSchema
);

export default ScheduledMessage;