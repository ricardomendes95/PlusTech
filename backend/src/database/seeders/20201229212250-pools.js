'use strict'

const POOLS = [
  {
    name: 'Centro',
  },
]

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('pools', POOLS)
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('pools', POOLS)
  },
}
