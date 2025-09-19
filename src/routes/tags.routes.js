import { Router } from "express";
import {
    getTagById,
    getAllTags,
    createTag,
    deleteTag,
    updateTag
} from "../controllers/tags.controller.js";

const router = Router();  

router.get("/tag", getAllTags);
router.get("/tag/:id", getTagById);
router.post("/tag", createTag);
router.put("/tag/:id", updateTag);
router.delete("/tag/:id", deleteTag);

export default router;