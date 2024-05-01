module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
      { id: 1, name: 'admin' },
      { id: 2, name: 'cliente' },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {})
  },
}
