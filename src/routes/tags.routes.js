import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { validateTag } from "../middlewares/tag.validator.js";
import {
    getTagById,
    getAllTags,
    createTag,
    deleteTag,
    updateTag
} from "../controllers/tags.controller.js";

const router = Router();  

router.get("/tag", auth, validateTag, getAllTags);
router.get("/tag/:id", auth, validateTag, getTagById);
router.post("/tag", auth, validateTag, createTag);
router.put("/tag/:id", auth, validateTag, updateTag);
router.delete("/tag/:id", auth, validateTag, deleteTag);

export default router;