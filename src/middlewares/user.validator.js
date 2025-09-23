import { body, param } from "express-validator";

export const validateUser = [
    body('username')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min:3, max:30 }).withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres'),
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email valido')
        .isLength({ max: 100 }).withMessage('El email no debe superar los 100 caracteres'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 carateres'),
];