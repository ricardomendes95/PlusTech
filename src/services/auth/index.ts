import { Definitions } from '../../core/types'
import { request } from '../request'
import { LoginResponse } from './types'

export function login(user: Definitions['User']) {
  return request<Definitions['User'], LoginResponse>('login', user)
}
