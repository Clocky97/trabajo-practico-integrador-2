import { body } from "express-validator";

export const validateArticle = [
    body('title')
        .notEmpty().withMessage('El titulo es obligatorio')
        .isLength({ min: 5, max: 150 }).withMessage('El titulo debe tener entre 5 y 150 caracteres'),
    body('content')
        .notEmpty().withMessage('El contenido no pude estar vacio')
        .isLength({ min: 20 }).withMessage('El contenido debe tener al menos 20 caracteres'),
    body('exerpt')
        .optional()
        .isLength({ max: 500 }).withMessage('El extracto no debe superar los 500 caracteres'),
    body('status')
        .isIn(['published', 'archived']).withMessage('Seleccione un estado valido (published, archived)'),
    body('author')
        .notEmpty().withMessage('El autor es obligatorio')
];