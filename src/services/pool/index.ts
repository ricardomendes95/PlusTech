import { CreatePoolResponse } from './types'
import api from '../api'

export function create(name: string) {
  return api.post<CreatePoolResponse>('/pool', { name })
}
