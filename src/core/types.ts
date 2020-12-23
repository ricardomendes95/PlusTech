/**
 *
 * Application Types
 *
 */

export interface Definitions {
  User: {
    login: string
    password: string
  }
  Pool: {
    id: number
    name: string
  }
}
