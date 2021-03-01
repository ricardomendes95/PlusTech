/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { SearchTypes, ToggleActiveTypes } from '../../components/HeaderContent'
import { HeaderContent, Menu, Header } from '../../components'
import { Table, Space, Tooltip, notification } from 'antd'

import {
  AiOutlineEdit,
  AiOutlineCheckCircle,
  AiOutlinePlus,
  AiOutlinePrinter,
} from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'

import * as S from './styles'
import { Link, useHistory } from 'react-router-dom'
import { routes } from '../../routes'
import { Definitions } from '../../core/types'
import { PaymentService } from '../../services'

interface LoadPaymentsParams {
  contributor?: string | number
  startDate?: string
  endDate?: string
  enabled?: boolean
}

interface Filter {
  value: string | string[]
  type: SearchTypes
}

export default function Movement() {
  const history = useHistory()

  const [toggleActive, setToggleActive] = useState<ToggleActiveTypes>('active')
  const [loadingPayments, setLoadingPayments] = useState(false)
  const [payments, setPayments] = useState<Definitions['Payment'][]>([])
  const [filter, setFilter] = useState<Filter>({ value: '', type: 'name' })

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
      render: (text: string, record: Definitions['Payment']) => (
        <Space size="middle">
          <Tooltip title="Editar" key={record.id}>
            <Link
              to={{ pathname: routes.editPayment, state: { payment: record } }}
            >
              <AiOutlineEdit size={20} />
            </Link>
          </Tooltip>

          <Tooltip
            title={record.enabled ? 'Inativar' : 'Ativar'}
            key={record.id}
          >
            <S.Action
              onClick={() =>
                record.enabled
                  ? handleDisable(Number(record.id))
                  : handleEnable(Number(record.id))
              }
            >
              {record.enabled ? (
                <GiCancel size={20} color="red" />
              ) : (
                <AiOutlineCheckCircle size={20} color="green" />
              )}
            </S.Action>
          </Tooltip>

          <Tooltip title="Imprimir" key={record.id}>
            <S.Action onClick={() => handlePrintDoc(Number(record.id))}>
              <AiOutlinePrinter size={20} />
            </S.Action>
          </Tooltip>
        </Space>
      ),
    },
  ]

  async function loadPayments(params?: LoadPaymentsParams) {
    setLoadingPayments(true)

    try {
      const response = await PaymentService.getAll({ poolId, params })

      setPayments(response.data)
    } catch (error) {
      console.log('Error', error)
    }

    setLoadingPayments(false)
  }

  async function handleDisable(id: number) {
    try {
      await PaymentService.disable(id)

      setPayments(prevState =>
        prevState.map(p => {
          if (p.id === id) {
            p.enabled = false
          }

          return p
        }),
      )
      notification.success({
        message: 'Desativado!',
      })
    } catch (error) {
      console.log('[handleDisable] - Error', error)
    }
  }

  async function handleEnable(id: number) {
    try {
      await PaymentService.enable(id)

      setPayments(prevState =>
        prevState.map(p => {
          if (p.id === id) {
            p.enabled = true
          }

          return p
        }),
      )
      notification.success({
        message: 'Ativado!',
      })
    } catch (error) {
      console.log('[handleEnable] - Error', error)
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

  function handleNewPayment() {
    history.push(routes.newPayment)
  }

  function handlePrintDoc(id: number) {
    history.push(`/print/${id}`)
  }

  useEffect(() => {
    const params: LoadPaymentsParams = {
      enabled: toggleActive === 'active',
    }

    if (filter.type === 'date' && filter.value) {
      params.startDate = filter.value[0]
      params.endDate = filter.value[1]
    }

    if (filter.type === 'name' && filter.value) {
      params.contributor = filter.value as string
    }

    loadPayments(params)
  }, [toggleActive, filter])

  return (
    <Menu active="movement">
      <S.Container>
        <Header text="Movimentação" />
        <S.Content>
          <HeaderContent
            onSearch={handleSearch}
            onToggleActive={handleToggleActive}
            origin="payments"
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
