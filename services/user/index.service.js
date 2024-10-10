const { getById } = require('./getById.service.js')
const { login } = require('./login.service.js')
const { register } = require('./register.service.js')
const { getByEmail } = require('./getByEmail.service.js')


module.exports = {
    getById,
    getByEmail,
    login,
    register
}