const express = require('express')
const router = express.Router()

const authController = require('../../controllers/api/auth/authController')
const loginValidation = require('../../middlewares/userLoginValidationMiddleware')

router.post('/login', loginValidation, authController.login)

module.exports = router
