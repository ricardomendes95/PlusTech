/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { SearchTypes, ToggleActiveTypes } from '../../components/HeaderContent'
import { HeaderContent, Menu, Header } from '../../components'
import { Table, Space } from 'antd'

import {
  AiOutlineEdit,
  AiOutlineCheckCircle,
  AiOutlinePlus,
  AiOutlinePrinter,
} from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'

import * as S from './styles'
import { useHistory } from 'react-router-dom'
import { routes } from '../../routes'
import { Definitions } from '../../core/types'
import { PaymentService } from '../../services'

export default function Movement() {
  const history = useHistory()

  const [toggleActive, setToggleActive] = useState<ToggleActiveTypes>('active')
  const [loadingPayments, setLoadingPayments] = useState(false)
  const [payments, setPayments] = useState<Definitions['Payment'][]>([])

  const poolId = Number(window.localStorage.getItem('poolId'))

  const columns = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Colaborador',
      dataIndex: 'contributor',
      key: 'contributor',
      render: (contributor: Definitions['Contributor']) => (
        <span>{contributor.name}</span>
      ),
    },
    {
      title: 'Valor Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: string) => (
        <span>
          {Number(total).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      ),
    },
    {
      title: 'Data',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => (
        <span>{new Date(createdAt).toLocaleDateString('pt-BR')}</span>
      ),
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
          <S.Action onClick={() => printDoc(record.id)}>
            <AiOutlinePrinter size={20} />
          </S.Action>
        </Space>
      ),
    },
  ]

  async function loadPayments() {
    setLoadingPayments(true)

    try {
      const response = await PaymentService.getAll(poolId)

      setPayments(response.data)
    } catch (error) {
      console.log('Error', error)
    }

    setLoadingPayments(false)
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
    console.log('value', value)
    console.log('searchType', searchType)
  }

  function handleToggleActive(toggleActive: ToggleActiveTypes) {
    setToggleActive(toggleActive)
  }

  function handleNewPayment() {
    history.push(routes.newPayment)
  }

  function printDoc(id: number) {
    console.log('send enable Movement:', id)
  }

  useEffect(() => {
    loadPayments()
  }, [])

  return (
    <Menu active="movement">
      <S.Container>
        <Header text="Movimentação" />
        <S.Content>
          <HeaderContent
            onSearch={handleSearch}
            onToggleActive={handleToggleActive}
          />

          <Table
            columns={columns}
            rowKey="id"
            dataSource={payments}
            pagination={{ position: ['bottomCenter'], hideOnSinglePage: true }}
            scroll={{ y: 300, x: '100%' }}
            loading={loadingPayments}
          />

          <S.Footer>
            <S.Create
              type="primary"
              icon={<AiOutlinePlus />}
              size="large"
              onClick={handleNewPayment}
            >
              Criar
            </S.Create>
          </S.Footer>
        </S.Content>
      </S.Container>
    </Menu>
  )
}
