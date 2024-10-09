const bcryptjs = require("bcryptjs");
const { User } = require('../../database/models');

const register = async (email, password, first_name, last_name) => {
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
}

module.exports = { register };