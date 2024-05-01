module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('shopping_carts', [
      {
        id: 1,
        user_id: 1,
        total_price: 0.0,
      },
      {
        id: 2,
        user_id: 2,
        total_price: 0.0,
      },
      {
        id: 3,
        user_id: 3,
        total_price: 0.0,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('shopping_carts', null, {})
  },
}
