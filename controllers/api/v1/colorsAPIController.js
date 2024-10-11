const { Color } = require('../../../database/models')
const { validationResult } = require('express-validator');

const handleValidationErrors = (res, errors) => {
    return res.status(400).json({
        success: false,
        errors: errors.mapped()
    });
};

const handleServerError = (res, error) => {
    console.error(error);
    return res.status(500).json({
        message: 'Internal server error',
        error: error.message
    });
};

const controller = {
    index: async (req, res) => {
        try {
            const colors = await Color.findAll()
            return res.json({
                meta: {
                    status: 200,
                    count: colors.length,
                },
                data: colors,
            })
        } catch (error) {
            return handleServerError(res, error)
        }
    },

    show: async (req, res) => {
        const { id } = req.params
        try {
            const color = await Color.findByPk(id)
            if (!color) return res.status(404).json({
                message: 'El color con el ID especificado no se encontró'
            })
            return res.status(200).json(color)
        } catch (error) {
            return handleServerError(res, error)
        }
    },

    store: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return handleValidationErrors(res, errors)
        const { name, cod_hex } = req.body
        try {
            const color = await Color.create(
                {
                    name,
                    cod_hex: `#${cod_hex}`
                }
            )
            return res.status(201).json({
                success: true,
                color
            })
        } catch (error) {
            return handleServerError(res, error)
        }
    },

    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return handleValidationErrors(res, errors)
        const { name, cod_hex } = req.body
        const { id } = req.params
        try {
            const [affectedRow] = await Color.update(
                { name, cod_hex: `#${cod_hex}` },
                { where: { id } }
            )
            if (!affectedRow) {
                return res.status(400).json({
                    success: false,
                    message: 'El color no se encontró o no se pudo actualizar',
                })
            }
            return res.status(200).json({
                success: true,
                message: 'El color se ha actualizado correctamente',
            })
        } catch (error) {
            return handleServerError(res, error)
        }
    },

    destroy: async (req, res) => {
        const { id } = req.params
        try {
            const affectedRow = await Color.destroy({
                where: { id }
            })
            if (!affectedRow) {
                return res.status(400).json({
                    success: false,
                    message: 'El color no se encontró o no se pudo eliminar',
                })
            }
            return res.status(200).json({
                success: true,
                message: 'El color se ha eliminada correctamente',
            })
        } catch (error) {
            return handleServerError(res, error)
        }
    },

    count: async (req, res) => {
        try {
            return res.status(200).json({
                total: await Color.count(),
            })
        } catch (error) {
            return handleServerError(res, error)
        }
    },
}

module.exports = controller
