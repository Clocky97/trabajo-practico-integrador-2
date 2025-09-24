import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { validateUser } from "../middlewares/user.validator.js";
import { login, register } from "../controllers/auth.controller.js";
import {
    getUserById,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
} from "../controllers/user.controller.js";
import { handleValidation } from "../middlewares/handle_validation.js";

const router = Router();


// login y registro
router.post("/register", validateUser, register);
router.post("/login", login);

// Rutas de usuario
router.get("/user", auth, validateUser, getAllUsers);
router.get("/user/:id", auth, validateUser, getUserById);
router.post("/user", validateUser, handleValidation, createUser );
router.put("/user/:id", auth, validateUser, updateUser);
router.delete("/user/:id", auth, validateUser, deleteUser);

export default router;