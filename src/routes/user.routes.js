import { Router } from "express";
import {
    getUserById,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
} from "../controllers/user.controller.js";

const router = Router();

router.get("user", getAllUsers);
router.get("user/:id", getUserById);
router.post("user", createUser);
router.put("user/:id", updateUser);
router.delete("user/:id", deleteUser);

export default router;