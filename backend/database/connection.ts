import { createConnection } from 'typeorm'

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'plustech',
  entities: ['../models/*.ts'],
})
