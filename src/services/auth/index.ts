import { Definitions } from '../../core/types'
import { PutUserRequest } from './types'
import api from '../api'

export function login(user: Definitions['User']) {
  return api.post<void>('login', user)
}

export function show() {
  return api.get<Definitions['User']>('/users')
}

export function update(user: PutUserRequest) {
  return api.put('/users', user)
}

export function create(user: Definitions['User']) {
  return api.post('/users', user)
}
