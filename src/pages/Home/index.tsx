/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { Menu } from '../../components'
import { Header } from '../../components/Header'
import { Radio, DatePicker, Table, Space } from 'antd'
import moment from 'moment'

import {
  AiOutlineEdit,
  AiOutlineCheckCircle,
  AiOutlinePlus,
} from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'

import * as S from './styles'

import { RadioChangeEvent } from 'antd/lib/radio'

export default function Home() {
  const [searchType, setSearchType] = useState('name')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchDate, setSearchDate] = useState({ start: '', end: '' })
  const [toggleActive, setToggleActive] = useState('active')

  const dateFormat = 'DD/MM/YYYY'
  const searchOptions = [
    { label: 'Nome', value: 'name' },
    { label: 'Data', value: 'date' },
  ]

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

  function onSearch(value: string) {
    console.log(value)
  }

  function handleDateChange(e: any) {
    const dates: string[] = []

    e?.forEach((date: any) => dates.push(date.toLocaleString()))
    setSearchDate({ start: dates[0], end: dates[1] })
  }

  function filterType(e: RadioChangeEvent) {
    console.log('radio2 checked', e.target.value)
    setSearchType(e.target.value)
  }

  return (
    <Menu active="home">
      <S.Container>
        <Header text="Colaboradores" />
        <S.Content>
          <S.HeaderContent>
            <div>
              {searchType === 'name' ? (
                <S.Search
                  placeholder="Pesquisar"
                  onSearch={onSearch}
                  style={{ width: 200 }}
                />
              ) : (
                <DatePicker.RangePicker
                  defaultValue={[
                    moment(new Date(), dateFormat),
                    moment(new Date(), dateFormat),
                  ]}
                  format={dateFormat}
                  onChange={handleDateChange}
                />
              )}
              <Radio.Group
                options={searchOptions}
                onChange={filterType}
                value={searchType}
              />
            </div>
            <div>
              <Radio.Group
                value={toggleActive}
                onChange={e => setToggleActive(e.target.value)}
              >
                <Radio.Button value="active">Ativos</Radio.Button>
                <Radio.Button value="inactive">Inativos</Radio.Button>
              </Radio.Group>
            </div>
          </S.HeaderContent>

          <Table
            columns={columns}
            rowKey="id"
            dataSource={data}
            pagination={{ position: ['bottomCenter'], hideOnSinglePage: true }}
            scroll={{ y: 300, x: '100%' }}
          />

          <S.Footer>
            <S.Create type="primary" icon={<AiOutlinePlus />} size="large">
              Criar
            </S.Create>
          </S.Footer>
        </S.Content>
      </S.Container>
    </Menu>
  )
}
