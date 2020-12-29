'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('contributors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      pool_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: 'pools',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      admission_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      wallet: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    })
  },

  down: async queryInterface => {
    return queryInterface.dropTable('contributors')
  },
}
