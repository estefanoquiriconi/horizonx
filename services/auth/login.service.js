const bcryptjs = require("bcryptjs");
const { User } = require('../../database/models');
const jwt = require('jsonwebtoken')


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

    const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

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