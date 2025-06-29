import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";
import { autenticarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", autenticarToken, createUser);
router.get("/", autenticarToken, getUsers);     
router.get("/:id", autenticarToken, getUserById);
router.put("/:id", autenticarToken, updateUser);
router.delete("/:id", autenticarToken, deleteUser);

export default router;
