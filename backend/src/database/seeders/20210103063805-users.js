'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const bcrypt = require('bcryptjs')

// const saltRounds = 10

// function getPassword() {
//   return new Promise((resolve, reject) => {
//     bcrypt.hash('admin', saltRounds, function (err, result) {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(result)
//       }
//     })
//   })
// }

module.exports = {
  up: async queryInterface => {
    // const password = await getPassword()

    await queryInterface.bulkInsert('users', [
      {
        login: 'admin',
        password: 'admin',
      },
    ])
  },

  down: async queryInterface => {
    // const password = await getPassword()

    await queryInterface.bulkDelete('users', [
      {
        login: 'admin',
        password: 'admin',
      },
    ])
  },
}
