import { CreatePaymentResponse, GetPaymentsResponse } from './types'
import api from '../api'
import { Definitions } from '../../core/types'

export function getAll(poolId: number) {
  return api.get<GetPaymentsResponse>(`/pools/${poolId}/payments`)
}

export function create(payment: Definitions['Payment']) {
  return api.post<CreatePaymentResponse>(
    `/pools/${payment.poolId}/payments`,
    payment,
  )
}
