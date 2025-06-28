import express from "express";
import { login, registerUser } from "../controllers/authController.js";


const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser); // ✅ rota pública de cadastro

export default router;
