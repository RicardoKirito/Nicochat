import { Router } from "express";
import {register, login, logout, profile, verify, changePassword} from '../controllers/auth.controller.js'
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, passwordchange, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/chagePassword', validateSchema(passwordchange), changePassword)
router.get('/profile', authRequired, profile)
router.post('/logout', logout)
router.post('/verify', verify)

export default router;