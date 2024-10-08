const express = require('express')
const router = express.Router()

const authController = require('../../controllers/api/auth/authController')
const loginValidation = require('../../middlewares/userLoginValidationMiddleware')
const registerValidation = require('../../middlewares/userRegisterValidationMiddleware')
const { verifyToken } = require('../../middlewares/verifyTokenMiddleware')

router.post('/login', loginValidation, authController.login)
router.post('/signIn', registerValidation, authController.signIn)
router.get('/profile', verifyToken, authController.profile)

module.exports = router
