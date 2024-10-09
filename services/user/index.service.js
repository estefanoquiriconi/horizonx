const { getById } = require('./getById.service.js')
const { login } = require('./login.service.js')
const { register } = require('./register.service.js')


module.exports = {
    getById,
    login,
    register
}