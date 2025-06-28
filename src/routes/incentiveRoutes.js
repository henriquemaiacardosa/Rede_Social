import express from "express";
import {
  createIncentive,
  getIncentives,
  getIncentivesByMeta,
  deleteIncentive
} from "../controllers/incentiveController.js";
import { autenticarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", autenticarToken, createIncentive);
router.get("/", getIncentives);
router.get("/meta/:meta_id", getIncentivesByMeta);
router.delete("/:id", autenticarToken, deleteIncentive);

export default router;
