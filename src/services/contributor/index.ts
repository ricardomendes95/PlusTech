import { CreateContributorResponse } from './types'
import api from '../api'
import { Definitions } from '../../core/types'

export function create(contributor: Definitions['Contributor']) {
  return api.post<CreateContributorResponse>(
    `/pools/${contributor.poolId}/contributors`,
    contributor,
  )
}
