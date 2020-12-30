import {
  CreateContributorResponse,
  GetContributorsRequest,
  GetContributorsResponse,
} from './types'
import api from '../api'
import { Definitions } from '../../core/types'
import { AxiosRequestConfig } from 'axios'

export function create(contributor: Definitions['Contributor']) {
  return api.post<CreateContributorResponse>(
    `/pools/${contributor.poolId}/contributors`,
    contributor,
  )
}

export function getAll(data: GetContributorsRequest) {
  const config: AxiosRequestConfig = {
    params: { ...data.params },
  }

  return api.get<GetContributorsResponse>(
    `/pools/${data.poolId}/contributors`,
    config,
  )
}

export function findByPK(id: number) {
  return api.get<Definitions['Contributor']>(`/contributors/${id}`)
}

export function disable(id: number) {
  return api.put(`/contributors/${id}/disable`)
}

export function enable(id: number) {
  return api.put(`/contributors/${id}/enable`)
}

export function update(contributor: Definitions['Contributor']) {
  return api.put(`/contributors/${contributor.id}/update`, contributor)
}
