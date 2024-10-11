const express = require('express')
const usersRoutes = require('./user.routes')
const router = express.Router();

router.use('/users', usersRoutes);

module.exports = router;
