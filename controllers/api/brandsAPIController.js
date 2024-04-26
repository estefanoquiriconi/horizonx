const { Brand, Product } = require('../../database/models')
const { validationResult } = require('express-validator');

const productsByBrand = async (id) => {
  return await Product.count({
    where: {
      brand_id: id
    }
  })
}

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
      const brands = await Brand.findAll()
      return res.json({
        meta: {
          status: 200,
          count: brands.length,
        },
        data: brands,
      })
    } catch (error) {
      return handleServerError(res, error)
    }
  },

  show: async (req, res) => {
    const { id } = req.params
    try {
      const brand = await Brand.findByPk(id)
      if (!brand) return res.status(404).json({
        message: 'La marca con el ID especificado no se encontró'
      })
      brand.setDataValue('totalProducts', await productsByBrand(brand.id))
      return res.status(200).json(brand)
    } catch (error) {
      return handleServerError(res, error)
    }
  },

  store: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return handleValidationErrors(res, errors)
    const { name } = req.body
    try {
      const brand = await Brand.create({ name })
      return res.status(201).json({
        success: true,
        brand
      })
    } catch (error) {
      return handleServerError(res, error)
    }
  },

  update: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return handleValidationErrors(res, errors)
    const { name } = req.body
    const { id } = req.params
    try {
      const [affectedRow] = await Brand.update(
        { name },
        { where: { id } }
      )
      if (!affectedRow) {
        return res.status(400).json({
          success: false,
          message: 'La marca no se encontró o no se pudo actualizar',
        })
      }
      return res.status(200).json({
        success: true,
        message: 'La marca se ha actualizado correctamente',
      })
    } catch (error) {
      return handleServerError(res, error)
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params
    try {
      const affectedRow = await Brand.destroy({
        where: { id }
      })
      if (!affectedRow) {
        return res.status(400).json({
          success: false,
          message: 'La marca no se encontró o no se pudo eliminar',
        })
      }
      return res.status(200).json({
        success: true,
        message: 'La marca se ha eliminada correctamente',
      })
    } catch (error) {
      return handleServerError(res, error)
    }
  },

  count: async (req, res) => {
    try {
      return res.status(200).json({
        total: await Brand.count(),
      })
    } catch (error) {
      return handleServerError(res, error)
    }
  },
}

module.exports = controller
