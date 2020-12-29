import { Sequelize } from 'sequelize'

export const database = new Sequelize('plustech', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: true,
    underscored: true,
  },
})
