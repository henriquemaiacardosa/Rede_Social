import express from "express";
import {
  createComment,
  getComments,
  getCommentsByMetaId,
  updateComment,
  deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

// Criar um comentário
router.post("/", createComment);

// Listar todos os comentários
router.get("/", getComments);

// Listar comentários por ID da meta
router.get("/meta/:meta_id", getCommentsByMetaId);

// Atualizar comentário por ID
router.put("/:id", updateComment);

// Deletar comentário por ID
router.delete("/:id", deleteComment);

export default router;
