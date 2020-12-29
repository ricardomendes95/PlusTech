import React, { FormEvent, useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineEdit } from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'
import { useHistory } from 'react-router-dom'
import { Definitions } from '../../core/types'
import { routes } from '../../routes'
import { PoolService } from '../../services'

import * as S from './styles'

export default function Pool() {
  const history = useHistory()

  const [inputMode, setInputMode] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [pools, setPools] = useState<Array<Definitions['Pool']>>([])

  async function loadPools() {
    try {
      const { data } = await PoolService.getAll()

      setPools(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function createPool() {
    try {
      const { data: pool } = await PoolService.create(inputValue)

      setPools(prevState => [...prevState, pool].filter(p => p.id !== 0))
      setInputMode(0)
      setInputValue('')
    } catch (error) {
      console.log('Erro ao criar pool', error)
    }
  }

  function handlePool(poolId: number) {
    console.log('Pool escolhido', poolId)
    history.push(routes.home)
  }

  function handleEditPool(pool: Definitions['Pool']) {
    setInputValue(pool.name)
    setInputMode(pool.id)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>, poolId: number) {
    e.preventDefault()

    if (poolId !== 0) {
      console.log('Edit pool')
    } else {
      createPool()
    }
  }

  function handleNewPool() {
    setPools(prevState => [
      ...prevState,
      {
        id: 0,
        name: '',
      },
    ])
  }

  function handleCancelCreate() {
    setPools(prevState => prevState.filter(p => p.id !== 0))
    setInputValue('')
    setInputMode(0)
  }

  useEffect(() => {
    loadPools()
  }, [])

  return (
    <S.Container>
      <S.Title>Escolha um Pool</S.Title>

      <S.PoolsWrapper>
        {pools.map(pool => (
          <S.PoolCard key={pool.id}>
            {inputMode === pool.id ? (
              <form onSubmit={e => handleSubmit(e, pool.id)}>
                <input
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  autoFocus
                />

                <button type="submit">
                  <AiOutlineCheck size={30} color="green" />
                </button>
              </form>
            ) : (
              <a onClick={() => handlePool(pool.id)}>
                <span>{pool.name}</span>
              </a>
            )}

            {pool.id !== inputMode ? (
              <a onClick={() => handleEditPool(pool)}>
                <AiOutlineEdit size={30} />
              </a>
            ) : (
              <a onClick={handleCancelCreate}>
                <GiCancel size={30} color="red" />
              </a>
            )}
          </S.PoolCard>
        ))}
      </S.PoolsWrapper>

      <S.PlusButton onClick={handleNewPool}>+</S.PlusButton>
    </S.Container>
  )
}
