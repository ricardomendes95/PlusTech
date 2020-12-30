/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { SearchTypes, ToggleActiveTypes } from '../../components/HeaderContent'
import { HeaderContent, Menu, Header } from '../../components'
import { Table, Space, notification, Tooltip } from 'antd'

import {
  AiOutlineEdit,
  AiOutlineCheckCircle,
  AiOutlinePlus,
} from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'

import * as S from './styles'
import { useHistory } from 'react-router-dom'
import { routes } from '../../routes'
import { ContributorService } from '../../services'
import { Definitions } from '../../core/types'
import moment from 'moment'

interface LoadContributorsParams {
  name?: string
  startDate?: string
  endDate?: string
  enabled?: boolean
}

interface Filter {
  value: string | string[]
  type: SearchTypes
}

export default function Home() {
  const history = useHistory()

  const [contributors, setContributors] = useState<
    Definitions['Contributor'][]
  >([])
  const [loadingContributors, setLoadingContributors] = useState(false)
  const [toggleActive, setToggleActive] = useState<ToggleActiveTypes>('active')
  const [filter, setFilter] = useState<Filter>({ value: '', type: 'name' })

  const poolId = Number(window.localStorage.getItem('poolId'))

  const columns = [
    {
      title: 'Matricula',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Data de Admissão',
      key: 'admissionDate',
      render: (record: { admissionDate: Date }) => (
        <p>{moment(record.admissionDate).format('DD/MM/YYYY')}</p>
      ),
    },

    {
      title: 'Ações',
      key: 'action',
      displayName: '21',
      render: (text: string, record: Definitions['Contributor']) => (
        <Space size="middle">
          <Tooltip title="Editar" key={record.id}>
            <S.Action onClick={() => update(record.id)}>
              <AiOutlineEdit size={20} />
            </S.Action>
          </Tooltip>
          <Tooltip
            title={record.enabled ? 'Desativar' : 'Ativar'}
            key={record.id}
          >
            <S.Action
              onClick={() =>
                record.enabled ? disable(record.id) : enable(record.id)
              }
            >
              {record.enabled ? (
                <GiCancel size={20} color="red" />
              ) : (
                <AiOutlineCheckCircle size={20} color="green" />
              )}
            </S.Action>
          </Tooltip>
        </Space>
      ),
    },
  ]

  async function loadContributors(params?: LoadContributorsParams) {
    setLoadingContributors(true)

    try {
      const response = await ContributorService.getAll({
        poolId,
        params,
      })

      setContributors(response.data)
    } catch (error) {
      console.log(error)
    }
    setLoadingContributors(false)
  }

  function update(id: number) {
    console.log('send update colaboration:', id)
    history.push(`/contributor/edit/${id}`)
  }

  async function disable(id: number) {
    try {
      await ContributorService.disable(id)
      notification.success({
        message: 'Colaborador Desativado!',
      })
      setContributors(prevState =>
        prevState.map(p => {
          if (p.id === id) {
            p.enabled = false
          }

          return p
        }),
      )
    } catch (error) {
      notification.success({
        message: 'Erro ao Desativar!',
        description: error,
      })
    }
  }

  async function enable(id: number) {
    try {
      await ContributorService.enable(id)
      notification.success({
        message: 'Colaborador Ativado!',
      })
      setContributors(prevState =>
        prevState.map(p => {
          if (p.id === id) {
            p.enabled = true
          }

          return p
        }),
      )
    } catch (error) {
      notification.success({
        message: 'Erro ao Ativar!',
        description: error,
      })
    }
  }

  function handleSearch(value: string | Date[], searchType: SearchTypes) {
    if (searchType === 'date') {
      const [startDate, endDate] = value as Date[]

      setFilter({
        type: searchType,
        value: [startDate.toString(), endDate.toString()],
      })
    } else {
      setFilter({
        type: searchType,
        value: value as string,
      })
    }
  }

  function handleToggleActive(toggleActive: ToggleActiveTypes) {
    setToggleActive(toggleActive)
  }

  function handleNewContributor() {
    history.push(routes.newContributor)
  }

  useEffect(() => {
    const params: LoadContributorsParams = {
      enabled: toggleActive === 'active',
    }

    if (filter.type === 'date' && filter.value) {
      params.startDate = filter.value[0]
      params.endDate = filter.value[1]
    }

    if (filter.type === 'name' && filter.value) {
      params.name = filter.value as string
    }
    loadContributors(params)
  }, [toggleActive, filter])

  return (
    <Menu active="home">
      <S.Container>
        <Header text="Colaboradores" />
        <S.Content>
          <HeaderContent
            onSearch={handleSearch}
            onToggleActive={handleToggleActive}
          />

          <Table
            columns={columns}
            rowKey="id"
            dataSource={contributors}
            pagination={{ position: ['bottomCenter'], hideOnSinglePage: true }}
            scroll={{ y: 300, x: '100%' }}
            loading={loadingContributors}
          />

          <S.Footer>
            <S.Create
              type="primary"
              icon={<AiOutlinePlus />}
              size="large"
              onClick={handleNewContributor}
            >
              Criar
            </S.Create>
          </S.Footer>
        </S.Content>
      </S.Container>
    </Menu>
  )
}
