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
  Contributor: {
    id: number
    poolId?: number
    name?: string
    admissionDate?: Date
    email?: string
    wallet?: string
    enabled?: boolean
  }
}
