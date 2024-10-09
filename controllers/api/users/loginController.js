const { validationResult } = require('express-validator');
const userSerive = require('../../../services/user/index.service')

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: "Error en la validación de los datos.",
            errors: errors.array()
        });
    }
    try {
        const response = await userSerive.login(req.body.email, req.body.password);
        if (response.error) {
            return res.status(response.status).json({ msg: response.msg });
        }

        return res.status(200).json({
            msg: "Inicio de sesión exitoso",
            token: response.token,
            user: response.user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
        });
    }
};

module.exports = { login }
