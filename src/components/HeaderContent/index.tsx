import { DatePicker, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

import * as S from './styles'

export type SearchTypes = 'name' | 'date'
export type ToggleActiveTypes = 'active' | 'inactive'

interface HeaderContentProps {
  onSearch?: (value: string | Array<Date>, searchType: SearchTypes) => void
  onToggleActive?: (active: ToggleActiveTypes) => void
}

export const HeaderContent = ({
  onSearch,
  onToggleActive,
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
          onChange={e => setSearchType(e.target.value)}
          value={searchType}
        />
      </S.AsideContent>

      <S.AsideContent>
        <Radio.Group
          value={toggleActive}
          onChange={e => setToggleActive(e.target.value)}
        >
          <Radio.Button value="active">Ativos</Radio.Button>
          <Radio.Button value="inactive">Inativos</Radio.Button>
        </Radio.Group>
      </S.AsideContent>
    </S.HeaderContent>
  )
}
