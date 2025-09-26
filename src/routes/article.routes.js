import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { validateArticle } from "../middlewares/article.validator.js";
import { assignTagToArticle, unassignTagFromArticle,} from "../controllers/tags.controller.js"
import {
    getArticleById,
    getAllArticles,
    createArticle,
    deleteArticle,
    updateArticle,
} from "../controllers/article.controller.js";

const router = Router();

router.get("/article", auth, validateArticle, getAllArticles);
router.get("/article/:id", auth, validateArticle, getArticleById);
router.post("/article", auth, validateArticle, createArticle);
router.put("/article/:id", auth, validateArticle, updateArticle);
router.delete("/article/:id", auth, validateArticle, deleteArticle);

//asignarle y quitarle un tag a un articulo

router.post("/articles/:id/tags",auth, assignTagToArticle);
router.delete("/articles/:id/tags/:tagId",auth, unassignTagFromArticle);

export default router;