import express from "express";
import {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal
} from "../controllers/goalController.js";

const router = express.Router();

// Rota para criar uma nova meta
router.post("/", createGoal);

// Rota para listar todas as metas
router.get("/", getGoals);

// Rota para buscar uma meta por ID
router.get("/:id", getGoalById);

// Rota para atualizar uma meta
router.put("/:id", updateGoal);

// Rota para deletar uma meta
router.delete("/:id", deleteGoal);

export default router;
