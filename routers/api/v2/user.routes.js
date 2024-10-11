const express = require('express')
const router = express.Router()

const userController = require('../../../controllers/api/v2/users/indexCotroller')

const loginValidation = require('../../../middlewares/userLoginValidationMiddleware')
const registerValidation = require('../../../middlewares/userRegisterValidationMiddleware')
const { verifyToken } = require('../../../middlewares/verifyTokenMiddleware')

router.post('/login', loginValidation, userController.login)
router.post('/register', registerValidation, userController.register)
router.get('/validate/:registrationCode', userController.validateAccount)


router.get('/profile', verifyToken, (req, res) => {
    res.status(200).json({
        msg: "Perfil",
        user: req.user
    })
})

module.exports = router
