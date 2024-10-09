const { validationResult } = require('express-validator');
const userSerive = require('../../../services/user/index.service')

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: "Por favor, verifica los datos ingresados.",
            errors: errors.array()
        });
    }

    try {
        const { email, password, firstName, lastName } = req.body;
        const response = await userSerive.register(email, password, firstName, lastName);

        if (response.error) {
            return res.status(response.status).json({ msg: response.msg });
        }

        return res.status(201).json({
            msg: "Usuario registrado exitosamente.",
            user: response.user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
        });
    }
}

module.exports = { register }
