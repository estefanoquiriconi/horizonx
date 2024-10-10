module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        first_name: 'María',
        last_name: 'Fernández',
        email: 'maria.fernandez@gmail.com',
        avatar: '1712112969193.jpg',
        password:
          '$2a$10$1t.uCqcLX0xBPWsioSP6b.hwOz.2RNjaS9.fRTD0sNZ7OeNq0gTba', // Contraseña: 123
        role_id: 1, // admin
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        first_name: 'Javier',
        last_name: 'Gonzáles',
        email: 'javier.gonzales@gmail.com',
        avatar: '1712114265240.jpg',
        password:
          '$2a$10$1t.uCqcLX0xBPWsioSP6b.hwOz.2RNjaS9.fRTD0sNZ7OeNq0gTba', // Contraseña: 123
        role_id: 2, // cliente
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
