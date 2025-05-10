import express from "express";
import {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  getUserGoals
} from "../controllers/goalController.js";
import { autenticarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", autenticarToken, createGoal);
router.get("/", getGoals); // Público - Lista todas as metas
router.get("/user", autenticarToken, getUserGoals); // Lista metas do usuário logado
router.get("/:id", getGoalById);
router.put("/:id", autenticarToken, updateGoal);
router.delete("/:id", autenticarToken, deleteGoal);

export default router;
