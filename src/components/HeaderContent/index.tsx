import { ConfigProvider, DatePicker, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import locale from 'antd/lib/locale/pt_BR'

import * as S from './styles'

export type SearchTypes = 'name' | 'date'
export type ToggleActiveTypes = 'active' | 'inactive'

interface HeaderContentProps {
  onSearch?: (value: string | Array<Date>, searchType: SearchTypes) => void
  onToggleActive?: (active: ToggleActiveTypes) => void
  origin?: string
}

export const HeaderContent = ({
  onSearch,
  onToggleActive,
  origin,
}: HeaderContentProps) => {
  const [searchType, setSearchType] = useState<SearchTypes>('name')
  const [toggleActive, setToggleActive] = useState<ToggleActiveTypes>('active')

  const dateFormat = 'DD/MM/YYYY'
  const searchOptions = [
    { label: 'Nome', value: 'name' },
    { label: 'Data', value: 'date' },
  ]

  function handleSearch(value: string) {
    if (onSearch) onSearch(value, 'name')
  }

  function handleDateChange(e: any) {
    const dates: Array<Date> = []

    e?.forEach((date: any) => dates.push(new Date(date.toDate())))

    if (onSearch) onSearch(dates, 'date')
  }

  useEffect(() => {
    if (onToggleActive) onToggleActive(toggleActive)
  }, [toggleActive])

  return (
    <S.HeaderContent>
      <S.AsideContent>
        {searchType === 'name' ? (
          <S.Search
            placeholder="Pesquisar"
            onSearch={handleSearch}
            style={{ width: 200 }}
          />
        ) : (
          <ConfigProvider locale={locale}>
            <DatePicker.RangePicker
              defaultValue={[
                moment(new Date(), dateFormat),
                moment(new Date(), dateFormat),
              ]}
              format={dateFormat}
              onChange={handleDateChange}
            />
          </ConfigProvider>
        )}
        <Radio.Group
          options={searchOptions}
          onChange={e => setSearchType(e.target.value)}
          value={searchType}
        />
      </S.AsideContent>

      <S.AsideContent>
        <Radio.Group
          value={toggleActive}
          onChange={e => setToggleActive(e.target.value)}
        >
          <Radio.Button value="active">
            {origin === 'payments' ? 'Pendente' : 'Ativos'}
          </Radio.Button>
          <Radio.Button value="inactive">
            {origin === 'payments' ? 'Concluído' : 'Inativos'}
          </Radio.Button>
        </Radio.Group>
      </S.AsideContent>
    </S.HeaderContent>
  )
}
