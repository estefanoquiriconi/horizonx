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
    },

    signIn: async (email, password, first_name, last_name) => {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return { error: true, msg: "El email ya está registrado.", status: 409 };
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            avatar: "default-avatar-image.png",
            role_id: 2, //cliente
        });

        return {
            error: false,
            user: {
                id: newUser.id,
                email: newUser.email,
                first_name: newUser.first_name,
                last_name: newUser.last_name
            }
        };
    },
};

module.exports = authService;