require('dotenv').config()
const { Category, Product } = require('../../../database/models')
const { validationResult } = require('express-validator')
const { APP_URL, APP_PORT } = process.env
const BASE_URL = `${APP_URL}:${APP_PORT || 80}`


async function productsByCategoty(id) {
  return await Product.count({
    where: { category_id: id }
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

const categoriesAPIController = {
  index: async (req, res) => {
    try {
      const categories = await Category.findAll()

      for (const category of categories) {
        let productCount = await productsByCategoty(category.id);
        category.setDataValue(
          'detail',
          `${BASE_URL}/api/categories/` + category.id
        )
        category.setDataValue('productCount', productCount)
      }

      return res.json({
        meta: {
          status: 200,
          count: categories.length,
          url: `${BASE_URL}/api/categories`,
        },
        data: categories,
      })
    } catch (error) {
      return handleServerError(req, error)
    }
  },

  show: async (req, res) => {
    const { id } = req.params
    try {
      const category = await Category.findByPk(id)
      if (!category) return res.status(404).json({
        success: false,
        message: 'La categoría con el ID especificado no se encontró',
      })
      category.setDataValue('productCount', await productsByCategoty(category.id))
      return res.status(200).json(category)
    } catch (error) {
      return handleServerError(res, error)
    }
  },

  store: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return handleValidationErrors(res, errors)
    const { name } = req.body
    try {
      const category = await Category.create({ name })
      return res.status(201).json({
        success: true,
        category
      })
    } catch (error) {
      return handleServerError(res, error)
    }
  },

  update: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return handleValidationErrors(res, errors)
    const { id } = req.params
    const { name } = req.body
    try {
      const [affectedRow] = await Category.update(
        { name },
        { where: { id } }
      )
      if (!affectedRow) {
        return res.status(400).json({
          success: false,
          message: 'La categoría no se encontró o no se pudo actualizar',
        })
      }
      return res.status(200).json({
        success: true,
        message: 'La categoría se ha actualizado correctamente',
      })
    } catch (error) {
      return handleServerError(res, error)
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params
    try {
      const affectedRow = await Category.destroy({
        where: { id }
      })
      if (!affectedRow) {
        return res.status(400).json({
          success: false,
          message: 'La categoría no se encontró o no se pudo eliminar',
        })
      }
      return res.status(200).json({
        success: true,
        message: 'La categoría se ha eliminado correctamente',
      })
    } catch (error) {
      return handleServerError(req, error)
    }
  },

  count: async (req, res) => {
    try {
      return res.status(200).json({
        total: await Category.count(),
      })
    } catch (error) {
      return handleServerError(res, error)
    }
  },
}

module.exports = categoriesAPIController
