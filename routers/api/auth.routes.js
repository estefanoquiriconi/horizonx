const express = require('express')
const router = express.Router()

const authController = require('../../controllers/api/auth/authController')
const loginValidation = require('../../middlewares/userLoginValidationMiddleware')
const registerValidation = require('../../middlewares/userRegisterValidationMiddleware')

router.post('/login', loginValidation, authController.login)
router.post('/signIn', registerValidation, authController.signIn)

module.exports = router
