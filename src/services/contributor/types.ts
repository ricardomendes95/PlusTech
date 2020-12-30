import { Definitions } from '../../core/types'

export type CreateContributorResponse = Definitions['Contributor']

export interface GetContributorsRequest {
  poolId: number
  params?: {
    enabled?: boolean
    name?: string
    startDate?: string
    endDate?: string
  }
}

export type GetContributorsResponse = Array<Definitions['Contributor']>
