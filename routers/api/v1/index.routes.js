const express = require('express')
const brandsRouter = require('./brands.routes')
const categoriesRouter = require('./categories.routes')
const colorsRouter = require('./colors.routes')
const productImageRouter = require('./productImage.routes')
const productsRouter = require('./products.routes')
const usersRouter = require('./users.routes')

const router = express.Router();

router.use('/brands', brandsRouter);
router.use('/categories', categoriesRouter);
router.use('/colors', colorsRouter);
router.use('/productImages', productImageRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);

module.exports = router;
