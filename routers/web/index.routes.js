const express = require('express')
const mainRoutes = require('./main.routes')
const cartRoutes = require('./cart.routes')
const productsRoutes = require('./products.routes')
const usersRoutes = require('./users.routes')

const authMiddleware = require('../../middlewares/authMiddleware')

const router = express.Router();

router.use('/', mainRoutes);
router.use('/cart', authMiddleware, cartRoutes);
router.use('/products', productsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
