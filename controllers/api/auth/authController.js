const { validationResult } = require('express-validator');
const authService = require('../../../services/auth/index.service');

const authController = {

    login: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: "Debes ingresar un email o contraseña válido.",
                errors: errors.array()
            });
        }

        try {
            const response = await authService.login(req.body.email, req.body.password);
            if (response.error) {
                return res.status(response.status).json({ msg: response.msg });
            }

            return res.status(200).json({
                msg: "Inicio de sesión exitoso",
                user: response.user
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
            });
        }
    },

    signIn: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: "Por favor, verifica los datos ingresados.",
                errors: errors.array()
            });
        }

        try {
            const { email, password, firstName, lastName } = req.body;
            const response = await authService.signIn(email, password, firstName, lastName);

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
    },

}

module.exports = authController
