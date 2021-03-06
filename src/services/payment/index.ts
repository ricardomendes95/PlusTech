import { AxiosRequestConfig } from 'axios'
import {
  CreatePaymentResponse,
  GetPaymentsRequest,
  GetPaymentsResponse,
  GetLatestPaymentResponse,
} from './types'
import api from '../api'
import { Definitions } from '../../core/types'

export function getAll(data: GetPaymentsRequest) {
  const config: AxiosRequestConfig = {
    params: data.params,
  }

  return api.get<GetPaymentsResponse>(`/pools/${data.poolId}/payments`, config)
}

export function findOne(id: number) {
  return api.get<GetLatestPaymentResponse>(`/payments/${id}`)
}

export function create(payment: Definitions['Payment']) {
  return api.post<CreatePaymentResponse>(
    `/pools/${payment.poolId}/payments`,
    payment,
  )
}

export function update(payment: Definitions['Payment']) {
  return api.put<void>(`/payments/${payment.id}`, payment)
}

export function enable(id: number) {
  return api.put<void>(`/payments/${id}/enable`)
}

export function disable(id: number) {
  return api.put<void>(`/payments/${id}/disable`)
}

export function latest(contributorId: number) {
  return api.get<GetLatestPaymentResponse>(
    `/contributors/${contributorId}/payments/latest`,
  )
}
