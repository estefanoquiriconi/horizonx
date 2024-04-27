const express = require('express')
const router = express.Router()

const controller = require('../../controllers/api/colorsAPIController')
const validations = require('../../middlewares/colorValidationMiddleware')

router.get('/', controller.index)
router.post('/', validations, controller.store)
router.get('/count', controller.count)
router.get('/:id', controller.show)
router.put('/:id', validations, controller.update)
router.delete('/:id', controller.destroy)

module.exports = router
