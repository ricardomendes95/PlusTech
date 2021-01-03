/* eslint-disable @typescript-eslint/no-unused-vars */
// import bcrypt from 'bcrypt'

const saltRounds = 10

export function hash(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    resolve(password)
    // bcrypt.hash(password, saltRounds, function (err, result) {
    //   if (err) {
    //     reject(err)
    //   } else {
    //     resolve(result)
    //   }
    // })
  })
}

export function compare(
  plaintextPassword: string,
  hashPassword: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    resolve(plaintextPassword === hashPassword)
    // bcrypt.compare(plaintextPassword, hashPassword, function (err, result) {
    //   if (err) {
    //     reject(err)
    //   } else {
    //     resolve(result)
    //   }
    // })
  })
}
