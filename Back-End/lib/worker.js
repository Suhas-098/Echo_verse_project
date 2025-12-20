import { Worker } from "bullmq";
import { Redis } from "ioredis";
import ScheduledMessage from "../models/scheduledMessage.js";
import Message from "../models/messages.js";

const pub = new Redis({ maxRetriesPerRequest: null });
const connection = new Redis({ maxRetriesPerRequest: null });

console.log("📡 Worker started and waiting for jobs...");

const worker = new Worker(
    "scheduled-messages",
    async (job) => {
        console.log(`🔄 Processing job ${job.id} for message ${job.data.messageId}`);

        const sched = await ScheduledMessage.findById(job.data.messageId);
        if (!sched) return;

        const message = await Message.create({
            senderId: sched.senderId,
            receiverId: sched.receiverId,
            text: sched.text,
            image: sched.image,
        });

        sched.status = "sent";
        await sched.save();

        // By adding this line, the message will be published to the socket this solves the issue of not receiving the message in real-time
        await pub.publish(
            "socket:newMessage",
            JSON.stringify(message)
        );

        console.log(`📤 Published scheduled message ${message._id}`);
    },
    { connection }
);

console.log("✅ Worker is ready");
