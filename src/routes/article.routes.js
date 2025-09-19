import { Router } from "express";
import {
    getArticleById,
    getAllArticles,
    createArticle,
    deleteArticle,
    updateArticle
} from "../controllers/article.controller.js";

const router = Router();

router.get("/article", getAllArticles);
router.get("/article/:id", getArticleById);
router.post("/article", createArticle);
router.put("/article/:id", updateArticle);
router.delete("/article/:id", deleteArticle);

export default router;