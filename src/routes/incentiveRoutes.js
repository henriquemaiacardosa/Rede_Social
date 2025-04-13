import express from "express";
import {
  createIncentive,
  getIncentives,
  getIncentivesByMeta,
  deleteIncentive
} from "../controllers/incentiveController.js";

const router = express.Router();


router.post("/", createIncentive);


router.get("/", getIncentives);


router.get("/meta/:meta_id", getIncentivesByMeta);


router.delete("/:id", deleteIncentive);

export default router;
