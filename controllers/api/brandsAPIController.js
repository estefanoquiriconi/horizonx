const { Brand } = require('../../database/models')
require('dotenv').config()
const { APP_URL, APP_PORT } = process.env
const BASE_URL = `${APP_URL}:${APP_PORT || 80}`

const controller = {
  index: async (req, res) => {
    try {
      const brands = await Brand.findAll()
      return res.json({
        meta: {
          status: 200,
          message: 'Successfully',
          count: brands.length,
          url: `${BASE_URL}/api/brands`,
        },
        data: brands,
      })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ error: 'Internal server error', message: error.message })
    }
  },

  show: async (req, res) => {
    const { id } = req.params
    try {
      const brand = await Brand.findByPk(id)
      brand ? res.json(brand) : res.json({ message: 'brand not found' })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ error: 'Internal server error', message: error.message })
    }
  },

  store: async (req, res) => {},

  update: async (req, res) => {},

  destroy: async (req, res) => {},
}

module.exports = controller
