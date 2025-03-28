import express from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";


const router = express.Router();

router.post("/usuarios", createUser);
router.get("/usuarios", getUsers);
router.get("/usuarios/:id", getUserById);
router.put("/usuarios/:id", updateUser);
router.delete("/usuarios/:id", deleteUser);

export default router;
