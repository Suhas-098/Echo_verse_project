import { Queue } from "bullmq";
import { Redis } from "ioredis";

const connection = new Redis({
    maxRetriesPerRequest: null,
});  // connects to memurai automatically

export const scheduledMessageQueue = new Queue("scheduled-messages", {
    connection,
});
