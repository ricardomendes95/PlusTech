/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { SearchTypes, ToggleActiveTypes } from '../../components/HeaderContent'
import { HeaderContent, Menu, Header } from '../../components'
import { Table, Space } from 'antd'

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
      dataIndex: 'admissionDate',
      key: 'admissionDate',
    },

    {
      title: 'Ações',
      key: 'action',
      displayName: '21',
      render: (text: string, record: { id: number }) => (
        <Space size="middle">
          <S.Action onClick={() => update(record.id)}>
            <AiOutlineEdit size={20} />
          </S.Action>
          <S.Action
            onClick={() =>
              toggleActive === 'active' ? disable(record.id) : enable(record.id)
            }
          >
            {toggleActive === 'active' ? (
              <GiCancel size={20} color="red" />
            ) : (
              <AiOutlineCheckCircle size={20} color="green" />
            )}
          </S.Action>
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
  }

  function disable(id: number) {
    console.log('send Delete colaboration:', id)
  }

  function enable(id: number) {
    console.log('send enable colaboration:', id)
  }

  function handleSearch(value: string | Date[], searchType: SearchTypes) {
    if (searchType === 'name') {
      loadContributors({ name: value as string })
    } else {
      const [startDate, endDate] = value as Date[]
      console.log(startDate, endDate)

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
