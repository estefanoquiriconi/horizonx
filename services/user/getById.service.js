const { User } = require('../../database/models')
const { BASE_URL} = require('../config.js')
const errors = require('../../helpers/errors.helper.js')

const getById = async (id) => {
    try {
        const user = await User.findByPk(id, {
            include: ['role'],
            attributes: {
                exclude: ['role_id', 'password']
            },
        })
        if (user) {
            user.setDataValue('avatar', `${BASE_URL}/images/users/` + user.avatar)
            return user
        }else{
            return null;
        }
    } catch (error) {
        errors.internalServerError(error.message, 'DATA_CONSULT')
    }
}

module.exports = { getById }