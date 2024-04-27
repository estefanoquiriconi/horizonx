const { body } = require('express-validator')

module.exports = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .bail()
    .isString()
    .withMessage('El nombre debe ser un texto')
    .bail()
    .isLength({ min: 3 })
    .withMessage('El nombre debe contener cómo mínimo 3 caracteres')
    .isLength({ max: 50 })
    .withMessage('El nombre no pude tener más de 50 caracteres'),
  body('cod_hex')
    .notEmpty()
    .withMessage('El código hexadecimal es requerido')
    .bail()
    .isHexadecimal()
    .withMessage('El código debe ser un hexadecimal')
    .bail()
    .isLength({min: 6, max: 6})
    .withMessage('El código debe tener 6 caracteres')
]
