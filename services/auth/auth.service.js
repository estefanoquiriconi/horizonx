const bcryptjs = require("bcryptjs");
const { User } = require('../../database/models');

const authService = {
    login: async (email, password) => {
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

        return {
            error: false,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        };
    }
};

module.exports = authService;