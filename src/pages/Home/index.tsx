/* eslint-disable react/display-name */
import React, { useState } from 'react'
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

export default function Home() {
  const history = useHistory()

  console.log('PoolId', window.localStorage.getItem('poolId'))

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
      dataIndex: 'dateAdmission',
      key: 'dateAdmission',
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

  const data = [
    {
      id: 1,
      name: 'John Brown',
      dateAdmission: '24/12/2020',
    },
    {
      id: 2,
      name: 'Jim Green',
      dateAdmission: '22/12/202',
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      id: 3,
      name: 'Joe Black',
      dateAdmission: '22/12/202',
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]

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
    console.log('value', value)
    console.log('searchType', searchType)
  }

  function handleToggleActive(toggleActive: ToggleActiveTypes) {
    setToggleActive(toggleActive)
  }

  function handleNewContributor() {
    history.push(routes.newContributor)
  }

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
            dataSource={data}
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
