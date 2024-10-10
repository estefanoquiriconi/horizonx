const { User } = require('../../database/models');
const { internalServerError } = require('../../helpers/errors.helper')

const register = async (first_name, last_name, email, password, registrationCode) => {
    try {
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password,
            avatar: "default-avatar-image.png",
            role_id: 2,
            registrationCode,
        });
        return newUser;
    } catch (error) {
        internalServerError(error.message, 'DATA_INSERT_ERROR');
    }
}

module.exports = { register };