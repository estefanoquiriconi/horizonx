const express = require('express')
const router = express.Router()

const controller = require('../../controllers/monolith/usersController')

const upload = require('../../middlewares/uploadAvatarMiddleware')
const registerValidation = require('../../middlewares/userRegisterValidationMiddleware')
const loginValidation = require('../../middlewares/userLoginValidationMiddleware')
const editValidation = require('../../middlewares/userEditValidationMiddleware')
const guest = require('../../middlewares/guestMiddleware')
const auth = require('../../middlewares/authMiddleware')

router.get('/login', guest, controller.login)
router.get('/register', guest, controller.register)
router.get('/profile', auth, controller.profile)
router.get('/logout', controller.logout)

router.post(
  '/register',
  upload.single('avatar'),
  registerValidation,
  controller.processRegister
)
router.post('/login', loginValidation, controller.processLogin)

router.put(
  '/edit',
  auth,
  upload.single('avatar'),
  editValidation,
  controller.edit
)

module.exports = router
