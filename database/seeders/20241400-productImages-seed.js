module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'product_images',
      [
        {
          id: 1,
          product_id: 1,
          image_filename: 'razr-165520-800-auto.png',
        },
        {
          id: 2,
          product_id: 2,
          image_filename: '1702522200114_img.png',
        },
        {
          id: 3,
          product_id: 3,
          image_filename: 'ip14_img.png',
        },
        {
          id: 5,
          product_id: 5,
          image_filename: 'razr-164579-700-auto.png',
        },
        {
          id: 6,
          product_id: 6,
          image_filename: 'mg54-165263-800-auto.png',
        },
        {
          id: 7,
          product_id: 7,
          image_filename: '1695823871SvMBE833_img.png',
        },
        {
          id: 8,
          product_id: 8,
          image_filename: '6841b7ab8dd7a3a088cb77.png',
        },
        {
          id: 11,
          product_id: 11,
          image_filename: '12315494856_img.jpg',
        },
        {
          id: 12,
          product_id: 12,
          image_filename: '15488965132158_img.png',
        },
        {
          id: 13,
          product_id: 13,
          image_filename: 'ipadpro_img.png',
        },
        {
          id: 14,
          product_id: 14,
          image_filename: 'matepad4_img.png',
        },
        {
          id: 15,
          product_id: 15,
          image_filename: '189199-800_img.png',
        },
        {
          id: 16,
          product_id: 16,
          image_filename: '539476295_img.png',
        },
        {
          id: 17,
          product_id: 17,
          image_filename: 'mbp16-gray_img.png',
        },
        {
          id: 18,
          product_id: 18,
          image_filename: 'mb68794521315_img.png',
        },
        {
          id: 21,
          product_id: 1,
          image_filename: 'razr-165521-800-auto.png',
        },
        {
          id: 22,
          product_id: 1,
          image_filename: 'razr-165522-800-auto.png',
        },
        {
          id: 23,
          product_id: 1,
          image_filename: 'razr-165523-800-auto.png',
        },
        {
          id: 24,
          product_id: 1,
          image_filename: 'razr-165524-800-auto.png',
        },
        {
          id: 25,
          product_id: 5,
          image_filename: 'razr-164580-700-auto.png',
        },
        {
          id: 26,
          product_id: 5,
          image_filename: 'razr-164581-700-auto.png',
        },
        {
          id: 27,
          product_id: 5,
          image_filename: 'razr-164582-700-auto.png',
        },
        {
          id: 28,
          product_id: 5,
          image_filename: 'razr-164583-700-auto.png',
        },
        {
          id: 29,
          product_id: 6,
          image_filename: 'mg54-165265-800-auto.png',
        },
        {
          id: 30,
          product_id: 6,
          image_filename: 'mg54-165266-800-auto.png',
        },
        {
          id: 31,
          product_id: 6,
          image_filename: 'mg54-165272-800-auto.png',
        },
        {
          id: 32,
          product_id: 6,
          image_filename: 'mg54-165273-800-auto.png',
        },
        {
          id: 33,
          product_id: 19,
          image_filename: 'Samsung_Galaxy_Z_Fold5_512_GB_Phantom_Black_1.webp',
        },
        {
          id: 34,
          product_id: 19,
          image_filename: 'Samsung_Galaxy_Z_Fold5_512_GB_Phantom_Black_2.webp',
        },
        {
          id: 35,
          product_id: 19,
          image_filename: 'Samsung_Galaxy_Z_Fold5_512_GB_Phantom_Black_3.webp',
        },
        {
          id: 39,
          product_id: 21,
          image_filename: 'Samsung_Galaxy_A24_1.png',
        },
        {
          id: 41,
          product_id: 21,
          image_filename: 'Samsung_Galaxy_A24_3.png',
        },
        {
          id: 42,
          product_id: 22,
          image_filename: 'Samsung_Galaxy_A34_1.webp',
        },
        {
          id: 43,
          product_id: 22,
          image_filename: 'Samsung_Galaxy_A34_2.webp',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_images', null, {})
  },
}
