import express from "express";
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage, scheduleMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlerware/auth.middleware.js";


const router = express.Router();

router.get("/contacts", protectRoute, getAllContacts);
router.get("/chats", protectRoute, getChatPartners);
router.get("/:id", protectRoute, getMessagesByUserId);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/schedule/:id", protectRoute, scheduleMessage);


export default router;
