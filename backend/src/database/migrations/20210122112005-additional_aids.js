'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('additional_aids', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: 'payments',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
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
    return queryInterface.dropTable('additional_aids')
  },
}
