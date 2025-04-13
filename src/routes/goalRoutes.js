import express from "express";
import {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal
} from "../controllers/goalController.js";

import { autenticarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Proteger criação de metas
router.post("/", autenticarToken, createGoal);
router.get("/", getGoals); // público
router.get("/:id", getGoalById);
router.put("/:id", autenticarToken, updateGoal);
router.delete("/:id", autenticarToken, deleteGoal);

export default router;
