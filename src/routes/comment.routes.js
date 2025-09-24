import { Router } from "express";
import { validateComment } from "../middlewares/comment.validator.js";
import { auth } from "../middlewares/auth.middleware.js";
import {
    getCommentById,
    getAllComments,
    createComment,
    deleteComment,
    updateComment
} from "../controllers/comment.controller.js";

const router = Router();

router.get("/comment", auth, validateComment, getAllComments);
router.get("/comment/:id", auth, validateComment, getCommentById);
router.post("/comment", auth, validateComment, createComment);
router.put("/comment/:id", auth, validateComment, updateComment);
router.delete("/comment/:id", auth, validateComment, deleteComment);

export default router;