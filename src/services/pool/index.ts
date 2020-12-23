import { request } from '../request'
import { CreatePoolResponse } from './types'

export function create(name: string) {
  return request<string, CreatePoolResponse>('pool-create', name)
}
