
require('dotenv').config()
const { APP_URL, APP_PORT } = process.env
const BASE_URL = `${APP_URL}:${APP_PORT || 80}`
const { User } = require('../../database/models')

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
        console.log(error);
    }
}

module.exports = { getById }