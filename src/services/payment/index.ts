import { CreatePaymentResponse } from './types'
import api from '../api'
import { Definitions } from '../../core/types'

export function create(payment: Definitions['Payment']) {
  return api.post<CreatePaymentResponse>(
    `/pools/${payment.poolId}/payments`,
    payment,
  )
}
