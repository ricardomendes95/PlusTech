import { CreatePoolResponse, GetPoolsResponse } from './types'
import api from '../api'

export function getAll() {
  return api.get<GetPoolsResponse>('/pools')
}

export function create(name: string) {
  return api.post<CreatePoolResponse>('/pools', { name })
}

export function edit(id: number, name: string) {
  return api.put<void>(`/pools/${id}`, { name })
}
