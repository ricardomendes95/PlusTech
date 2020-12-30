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
  Payment: {
    id: number
    poolId: number
    contributorId: number
    salary?: number
    leader?: number
    bonus?: number
    goal?: number
    rent?: number
    taxi?: number
    fine?: number
    total?: number
    enabled?: boolean
    contributor?: Definitions['Contributor']
  }
  Contributor: {
    id: number
    poolId?: number
    name?: string
    admissionDate?: Date
    email?: string
    wallet?: string
    enabled?: boolean
    payments?: Definitions['Payment'][]
  }
}
