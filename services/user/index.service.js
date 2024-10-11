const { getById } = require('./getById.service.js')
const { register } = require('./register.service.js')
const { getByEmail } = require('./getByEmail.service.js')
const { registerSendEmail } = require('./registerSendEmail.service.js')
const { activeAccount } = require('./activeAccount.service.js')
const { getByRegistrationCode } = require('./getByRegistrationCode.service.js')


module.exports = {
    getById,
    getByEmail,
    register,
    registerSendEmail,
    activeAccount,
    getByRegistrationCode
}