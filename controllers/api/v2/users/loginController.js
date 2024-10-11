const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs')
const userService = require('../../../../services/user/index.service')
const { notAuthorizedError, notFoundError, forbiddenError, badRequestError } = require('../../../../helpers/errors.helper')
const { createToken } = require('../../../../services/security/createToken.service')

const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            badRequestError(errors.array())
        }
        const { email, password } = req.body

        const user = await userService.getByEmail(email)
        if (!user) {
            notFoundError('Usuario no encontrado', 'USER_NOT_FOUND')
        }

        const passwordOk = await bcryptjs.compare(password, user.password);
        if (!passwordOk) {
            notAuthorizedError('Credenciales incorrectas', 'INVALID_CREDENTIALS')
        }

        if (!user?.active) {
            const errorMessage = user?.registrationCode ? 'El usuario aún no fue activado' : 'El usuario está desactivado';
            forbiddenError(errorMessage, user?.registrationCode ? 'PENDING_ACTIVATION' : 'USER_INACTIVE');
        }

        const tokenInfo = {
            id: user.id,
            email: user.email
        }

        const token = createToken(tokenInfo);

        return res.status(200).json({
            status: "success",
            message: "Usuario logueado con éxito",
            token
        });

    } catch (error) {
        next(error)
    }
};

module.exports = { login }
