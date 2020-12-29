'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('payments', {
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

      contributor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: 'contributors',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      salary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      leader: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      bonus: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      goal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      rent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      taxi: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      fine: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      total: {
        type: Sequelize.DECIMAL(10, 2),
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
    return queryInterface.dropTable('payments')
  },
}
