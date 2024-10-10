const { validationResult } = require('express-validator');
const randomstring = require('randomstring');
const bcryptjs = require('bcryptjs');
const userSerive = require('../../../services/user/index.service');
const { badRequestError, conflictError } = require('../../../helpers/errors.helper')

const register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            badRequestError(errors.array())
        }

        const { email, password, firstName, lastName } = req.body;
        const userExist = await userSerive.getByEmail(email)

        if (userExist) {
            conflictError('El email ya está registrado.')
        }

        const registrationCode = randomstring.generate(30);
        const hashedPassword = bcryptjs.hashSync(password, 10);

        await userSerive.register(firstName, lastName, email, hashedPassword, registrationCode);

        return res.status(201).json({
            status: "success",
            message: "Usuario registrado con éxito.",
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { register }