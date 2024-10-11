module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      avatar: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: 'default-avatar-image.png'
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      registrationCode: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      recoverPassCode: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};