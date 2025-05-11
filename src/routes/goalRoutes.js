import express from "express";
import {
  createGoal,
  getGoals,
  getUserGoals,
  getGoalById,
  updateGoal,
  deleteGoal
} from "../controllers/goalController.js";
import { autenticarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", autenticarToken, createGoal);

router.get("/", getGoals);

router.get("/user", autenticarToken, getUserGoals);

router.get("/:id", getGoalById);

router.put("/:id", autenticarToken, updateGoal);

router.delete("/:id", autenticarToken, deleteGoal);

export default router;
