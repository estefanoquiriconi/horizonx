const { ProductImage } = require('../../database/models')
const path = require('path')

const handleServerError = (res, error) => {
  console.error(error)
  return res.status(500).json({
    message: 'Internal server error',
    error: error.message,
  })
}

const productImageAPIController = {
  index: async (req, res) => {
    try {
      const productImages = await ProductImage.findAll()
      return res.status(200).json({
        meta: {
          success: true,
          count: productImages.length,
        },
        data: productImages,
      })
    } catch (error) {
      return handleServerError(res, error)
    }
  },

  show: async (req, res) => {
    const { id } = req.params
    try {
      const image = await ProductImage.findOne({
        where: { id },
      })

      if (!image) {
        return res
          .status(404)
          .send({ success: false, message: 'Imagen no encontrada' })
      }

      const imagePath = path.join(
        __dirname,
        '../../public/images/products/' + image.image_filename
      )

      res.sendFile(imagePath)
    } catch (error) {
      return handleServerError(res, error)
    }
  },

  store: async (req, res) => {},

  update: async (req, res) => {},

  destroy: async (req, res) => {
    const { id } = req.params
    let affectedRow = 0
    try {
      const image = await ProductImage.findByPk(id)
      if (!image)
        return res.status(404).json({
          message: 'La imagen con el ID especificado no se encontró',
        })
      const totalImages = await ProductImage.count({
        where: {
          product_id: image.product_id,
        },
      })
      if (totalImages > 1) {
        affectedRow = await ProductImage.destroy({
          where: { id },
        })
        return res.status(200).json({
          success: true,
          message: 'La imagen se ha eliminada correctamente',
        })
      }
      if (!affectedRow) {
        return res.status(400).json({
          success: false,
          message: 'La imagen no se encontró o no se pudo eliminar',
        })
      }
    } catch (error) {
      return handleServerError(res, error)
    }
  },

  count: async (req, res) => {
    try {
      return res.status(200).json({
        total: await ProductImage.count(),
      })
    } catch (error) {
      return handleServerError(res, error)
    }
  },
}

module.exports = productImageAPIController
