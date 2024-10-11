const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs')
const userSerive = require('../../../../services/user/index.service')
const { notAuthorizedError, notFoundError, forbiddenError, badRequestError } = require('../../../../helpers/errors.helper')
const { createToken } = require('../../../../services/security/createToken.service')

const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            badRequestError(errors.array())
        }
        const { email, password } = req.body

        const user = await userSerive.getByEmail(email)
        if (!user) {
            notFoundError('Usuario no encontrado', 'USER_NOT_FOUND')
        }

        const passwordOk = bcryptjs.compareSync(password, user.password);
        if (!passwordOk) {
            notAuthorizedError('Credenciales incorrectas', 'INVALID_CREDENTIALS')
        }

        if (!user.active && user.registrationCode != null) {
            forbiddenError('El usuario aún no fue activado', 'PENDING_ACTIVATION')
        }

        if (!user.active && user.registrationCode == null) {
            forbiddenError('El usuario está desactivado', 'USER_INACTIVE')
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
