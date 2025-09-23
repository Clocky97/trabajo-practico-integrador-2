import { body } from "express-validator";

export const validateComment = [
    body('content')
        .notEmpty().withMessage('Debe comentar algo')
        .isLength({ min: 1, max: 500 }).withMessage('El comentario debe tener entre 1 y 500 caracteres'),
]