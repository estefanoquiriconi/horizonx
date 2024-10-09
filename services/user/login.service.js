const bcryptjs = require("bcryptjs");
const { User } = require('../../database/models');
const { createToken } = require('../security/createToken.service')


const login = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return {
            error: true,
            msg: "El email o la contraseña son incorrectos.",
            status: 404
        };
    }

    const passwordOk = bcryptjs.compareSync(password, user.password);
    if (!passwordOk) {
        return {
            error: true,
            msg: "El email o la contraseña son incorrectos.",
            status: 401
        };
    }

    const token =  createToken({ id: user.id, email: user.email })
    return {
        error: false,
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        },
        token
    };
}

module.exports = { login }