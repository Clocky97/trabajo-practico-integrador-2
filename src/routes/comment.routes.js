import { Router } from "express";
import {
    getCommentById,
    getAllComments,
    createComment,
    deleteComment,
    updateComment
} from "../controllers/comment.controller.js";

const router = Router();

router.get("/comment", getAllComments);
router.get("/comment/:id", getCommentById);
router.post("/comment", createComment);
router.put("/comment/:id", updateComment);
router.delete("/comment/:id", deleteComment);

export default router;