const { notFoundError } = require('../../../helpers/errors.helper')
const userService = require('../../../services/user/index.service')

const validateAccount = async (req, res, next) => {
    try {
        const { registrationCode } = req.params
        const user = await userService.getByRegistrationCode(registrationCode)

        if (!user) {
            notFoundError('Usuario no encontrado', 'USER_VALIDATE_ERROR')
        }

        await userService.activeAccount(user);

        res.status(200).json({
            status: "success",
            message: "Usuario activado con éxito"
        })

    } catch (error) {
        next(error);
    }

}

module.exports = { validateAccount }