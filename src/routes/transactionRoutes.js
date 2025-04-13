import express from "express";
import { comentarEAtualizarMeta } from "../controllers/transactionController.js";
import { autenticarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/comentar-com-atualizacao", autenticarToken, comentarEAtualizarMeta);

export default router;
