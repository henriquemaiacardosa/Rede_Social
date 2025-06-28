import express from "express";
import {
  createComment,
  getComments,
  getCommentsByMetaId,
  updateComment,
  deleteComment
} from "../controllers/commentController.js";
import { autenticarToken } from "../middleware/authMiddleware.js"; // ou default

const router = express.Router();

router.post("/", autenticarToken, createComment);
router.get("/", getComments);
router.get("/meta/:meta_id", getCommentsByMetaId);
router.put("/:id", autenticarToken, updateComment);
router.delete("/:id", autenticarToken, deleteComment);

export default router;
