const express = require('express')
const router = express.Router()

const controller = require('../../controllers/api/brands/brandsAPIController')
const validation = require('../../middlewares/nameValidationMiddleware')

router.get('/', controller.index)
router.post('/', validation, controller.store)
router.get('/count', controller.count)
router.get('/:id', controller.show)
router.put('/:id', validation, controller.update)
router.delete('/:id', controller.destroy)

module.exports = router
