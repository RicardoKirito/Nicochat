import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createChat, deleteChat, getChat, searchChat, updateChat, getAllChatFiles } from "../controllers/chat.controller.js";

const router = Router();


router.get("/chat/", authRequired, getChat)
router.get("/chat/files-:id", authRequired, getAllChatFiles)
router.post("/chat", authRequired, createChat)
router.post("/chat/search/:username", authRequired, searchChat)
router.put("/chat/:id", authRequired, updateChat)
router.delete("/chat/:id", authRequired, deleteChat)

export default router;