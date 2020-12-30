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
}

export default function Home() {
  const history = useHistory()
  const [contributors, setContributors] = useState<
    Definitions['Contributor'][]
  >([])

  const poolId = Number(window.localStorage.getItem('poolId'))

  const [toggleActive, setToggleActive] = useState<ToggleActiveTypes>('active')

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
      render: (text: string, record: { id: number }) => (
        <Space size="middle">
          <Tooltip title="Editar" key={record.id}>
            <S.Action onClick={() => update(record.id)}>
              <AiOutlineEdit size={20} />
            </S.Action>
          </Tooltip>
          <Tooltip
            title={toggleActive === 'active' ? 'Desativar' : 'Ativar'}
            key={record.id}
          >
            <S.Action
              onClick={() =>
                toggleActive === 'active'
                  ? disable(record.id)
                  : enable(record.id)
              }
            >
              {toggleActive === 'active' ? (
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

  async function loadContributors({
    name,
    startDate,
    endDate,
  }: LoadContributorsParams) {
    try {
      const { data } = await ContributorService.getAll({
        poolId,
        params: {
          enabled: toggleActive === 'active',
          name,
          startDate,
          endDate,
        },
      })

      setContributors(data)
    } catch (error) {
      console.log(error)
    }
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
      loadContributors({})
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
      loadContributors({})
    } catch (error) {
      notification.success({
        message: 'Erro ao Ativar!',
        description: error,
      })
    }
  }

  function handleSearch(value: string | Date[], searchType: SearchTypes) {
    if (searchType === 'name') {
      loadContributors({ name: value as string })
    } else {
      const [startDate, endDate] = value as Date[]

      loadContributors({
        startDate: startDate.toString(),
        endDate: endDate.toString(),
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
    loadContributors({})
  }, [toggleActive])

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
