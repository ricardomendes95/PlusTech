import { Definitions } from '../../core/types'
import api from '../api'

export function login(user: Definitions['User']) {
  return api.post('login', user)
}
