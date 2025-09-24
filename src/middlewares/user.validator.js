import { body } from "express-validator";

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
    body('role')
        .isIn(['user', 'admin']).withMessage('Seleccione un rol valido (user, admin)'),
    body('profile.firstName')
        .notEmpty().withMessage('Por favor ingrese su nombre')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre deber tener de 2 a 50 caracteres'),
    body('profile.lastName')
        .notEmpty().withMessage('Por favor ingrese su apellido')
        .isLength({ min: 2, max: 50 }).withMessage('El apellido deber tener de 2 a 50 caracteres'),
    body('profile.biography')
        .optional()
        .isLength({ max: 500 }).withMessage('La biografía no debe superar los 500 caracteres'),
    body('profile.avatarUrl')
        .optional()
        .isURL().withMessage('La URL del avatar no es válida'),
    body('profile.birthDate')
        .optional()
        .isDate().toDate().withMessage('La fecha de nacimiento no es válida'),
];