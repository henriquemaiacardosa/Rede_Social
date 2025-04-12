import express from "express";
import {
  createIncentive,
  getIncentives,
  getIncentivesByMeta,
  deleteIncentive
} from "../controllers/incentiveController.js";

const router = express.Router();

// Criar incentivo
router.post("/", createIncentive);

// Listar todos os incentivos
router.get("/", getIncentives);

// Listar incentivos por meta
router.get("/meta/:meta_id", getIncentivesByMeta);

// Remover incentivo
router.delete("/:id", deleteIncentive);

export default router;
