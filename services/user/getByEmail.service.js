const { User } = require('../../database/models')
const errors = require('../../helpers/errors.helper')

const getByEmail = async (email) => {
    try {
        return await User.findOne({ where: { email } })
    } catch (error) {
        errors.internalServerError(error.message, 'DATA_CONSULT')
    }
}

module.exports = { getByEmail }