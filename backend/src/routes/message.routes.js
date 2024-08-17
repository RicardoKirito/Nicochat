import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { addMessage, deleteMessage, getMessages, updateMessage } from "../controllers/message.controller.js";

const router = Router();

router.get('/message/:id', authRequired, getMessages);
router.post('/message', authRequired, addMessage);
router.delete('/message/:id', authRequired, deleteMessage);
router.put('/message/:id', authRequired, updateMessage);

export default router;