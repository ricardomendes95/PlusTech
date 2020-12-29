'use strict'

const CONTRIBUTORS = [
  {
    pool_id: 1,
    name: 'Joao da Silva',
    admission_date: '2020-01-01 01:01:01',
    email: 'joaodasilva@email.com',
    wallet: 'my-wallet-key',
  },
]

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('contributors', CONTRIBUTORS)
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('contributors', CONTRIBUTORS)
  },
}
