import express from "express";
import {
  createComment,
  getComments,
  getCommentsByMetaId,
  updateComment,
  deleteComment
} from "../controllers/commentController.js";

const router = express.Router();


router.post("/", createComment);


router.get("/", getComments);


router.get("/meta/:meta_id", getCommentsByMetaId);


router.put("/:id", updateComment);


router.delete("/:id", deleteComment);

export default router;
