import { body } from "express-validator";

export const validateTag = [
    body('name')
        .notEmpty().withMessage('El nombre de la etiqueta es obligatorio')
        .isLength({ min:2, max: 30 }).withMessage('El nombre de la etiqueta debe tenes entre 2 y 30 caracteres'),
    body('description')
        .trim()
        .optional()
        .isLength({ max: 200 }).withMessage('La descripción no debe superar los 200 caracteres'),
];

