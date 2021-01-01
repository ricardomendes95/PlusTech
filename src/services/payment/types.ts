import { Definitions } from '../../core/types'

export interface GetPaymentsRequest {
  poolId: number
  params?: {
    enabled?: boolean
    contributor?: string | number
    startDate?: string
    endDate?: string
  }
}

export type GetPaymentsResponse = Array<Definitions['Payment']>

export type GetLatestPaymentResponse = Definitions['Payment']

export type CreatePaymentResponse = Definitions['Payment']
