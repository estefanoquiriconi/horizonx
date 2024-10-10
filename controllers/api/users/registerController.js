const { validationResult } = require('express-validator');
const { User } = require('../../../database/models')

const userSerive = require('../../../services/user/index.service');
const randomstring = require('randomstring');
const bcryptjs = require('bcryptjs');
const errorHelper = require('../../../helpers/errors.helper')

const register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errorHelper.badRequestError(errors.array())
        }

        const { email, password, firstName, lastName } = req.body;
        const registrationCode = randomstring.generate(30);
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            errorHelper.conflictError('El email ya está registrado.')
        }

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