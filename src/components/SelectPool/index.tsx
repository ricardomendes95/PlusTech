import React, { useEffect, useState } from 'react'

import * as S from './styles'
import { Definitions } from '../../core/types'
import { Select } from 'antd'
import { PoolService } from '../../services'

interface SelectPoolProps {
  contributor?: Definitions['Contributor']
  onContributorChange?: (contributor: Definitions['Contributor']) => void
}

export const SelectPool = ({
  contributor,
  onContributorChange,
}: SelectPoolProps) => {
  const [poolId, setPoolId] = useState<string>()
  const [poolsOptions, setPoolsOptions] = useState<Definitions['Pool'][]>([])

  function handleSelectPool(value: string) {
    const idPool = poolsOptions?.find(opt => opt.id === Number(value))?.id || ''
    setPoolId(String(idPool))
    contributor = { poolId: Number(idPool), ...contributor }
    console.log(contributor)
  }

  async function loadPools() {
    try {
      const { data } = await PoolService.getAll()

      setPoolsOptions(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setPoolId(String(contributor?.poolId))
    loadPools()
  }, [])

  useEffect(() => {
    if (onContributorChange) {
      onContributorChange({ ...contributor, poolId: Number(poolId) })
    }
  }, [poolId])
  return (
    <S.Container>
      <Select value={String(poolId)} onChange={handleSelectPool}>
        {poolsOptions?.map(pool => (
          <Select.Option key={pool.id} value={String(pool.id)}>
            {pool.name}
          </Select.Option>
        ))}
      </Select>
    </S.Container>
  )
}
