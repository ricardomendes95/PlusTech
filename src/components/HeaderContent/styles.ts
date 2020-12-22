import { Input } from 'antd'
import styled from 'styled-components'

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 3%;
`

export const Search = styled(Input.Search)`
  min-width: 302px;
`

export const AsideContent = styled.div`
  .ant-radio-group {
    margin-left: 20px;
  }

  .ant-picker {
    min-width: 302px;
  }
`
