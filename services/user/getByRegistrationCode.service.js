const { internalServerError } = require('../../helpers/errors.helper');
const { User } = require('../../database/models')

const getByRegistrationCode = async (registrationCode) => {
    try {
        const user = await User.findOne({ where: { registrationCode } })
        return user;
    } catch (error) {
        internalServerError(error.message, 'DATE_CONSULT_ERROR')
    }
}

module.exports = { getByRegistrationCode }