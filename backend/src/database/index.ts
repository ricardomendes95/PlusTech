import { Sequelize } from 'sequelize'
import mysql2 from 'mysql2'

export const database = new Sequelize('plustech', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: mysql2,
  define: {
    timestamps: true,
    underscored: true,
  },
})
