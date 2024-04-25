const express = require('express')
const router = express.Router()

const controller = require('../controllers/productsController')

const upload = require('../middlewares/uploadProductMiddleware')
const formValidation = require('../middlewares/productFormValidationMiddleware')
const auth = require('../middlewares/authMiddleware')
const admin = require('../middlewares/adminMiddleware')

router.get('/detail/:id', controller.detail)
router.get('/create', auth, admin, controller.create)
router.get('/edit/:id', auth, admin, controller.edit)
router.get('/search', controller.search)
router.get('/:category?', controller.index)

router.post('/create', upload.array('images'), formValidation, controller.store)

router.put(
  '/edit/:id',
  upload.array('images'),
  formValidation,
  controller.update
)

router.delete('/delete/:id', auth, admin, controller.delete)
router.delete('/delete/image/:id', auth, admin, controller.deleteImage)

module.exports = router
