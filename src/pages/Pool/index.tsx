import React, { FormEvent, useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineEdit } from 'react-icons/ai'
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
  const [loading, setLoading] = useState(false)

  async function loadPools() {
    setLoading(true)

    try {
      const { data } = await PoolService.getAll()

      setPools(data)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
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

  async function editPool(id: number) {
    setLoading(true)
    try {
      setPools(prevState =>
        prevState.map(p => {
          if (p.id === id) {
            p.name = inputValue
          }

          return p
        }),
      )
      setInputMode(0)
      setInputValue('')

      await PoolService.edit(id, inputValue)
    } catch (error) {
      console.log('Erro ao editar pool', error)
    }
    setLoading(false)
  }

  function handlePool(poolId: number) {
    window.localStorage.setItem('poolId', String(poolId))
    history.push(routes.home)
  }

  function handleEditPool(pool: Definitions['Pool']) {
    setInputValue(pool.name)
    setInputMode(pool.id)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>, poolId: number) {
    e.preventDefault()

    if (poolId !== 0) {
      editPool(poolId)
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
    setInputMode(0)
    setInputValue('')
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
              <S.Form onSubmit={e => handleSubmit(e, pool.id)}>
                <S.Input
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  autoFocus
                />

                <S.SaveButton type="submit" disabled={loading}>
                  <AiOutlineCheck size={30} color="#1890ff" />
                </S.SaveButton>
              </S.Form>
            ) : (
              <a onClick={() => handlePool(pool.id)}>
                <span>{pool.name}</span>
              </a>
            )}

            {pool.id !== inputMode ? (
              <S.EditCancelButton
                onClick={() => handleEditPool(pool)}
                disabled={loading}
              >
                <AiOutlineEdit size={30} color="#1890ff" />
              </S.EditCancelButton>
            ) : (
              <S.EditCancelButton
                onClick={handleCancelCreate}
                disabled={loading}
              >
                <strong>X</strong>
              </S.EditCancelButton>
            )}
          </S.PoolCard>
        ))}
      </S.PoolsWrapper>

      <S.PlusButton onClick={handleNewPool}>+</S.PlusButton>
    </S.Container>
  )
}
