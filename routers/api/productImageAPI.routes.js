const express = require('express')
const router = express.Router()

const controller = require('../../controllers/api/productImagesAPIController')
const validations = require('../../middlewares/colorValidationMiddleware')

router.get('/', controller.index)
router.post('/', controller.store)
router.get('/count', controller.count)
router.get('/:id', controller.show)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

module.exports = router
