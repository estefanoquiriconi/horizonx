const { login } = require('./loginController')
const { register } = require('./registerController')
const { validateAccount } = require('./validateAccount')


module.exports = {
    login,
    register,
    validateAccount
}