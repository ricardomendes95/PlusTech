import styled from 'styled-components'

import { Button, Input } from 'antd'

export const Container = styled.div`
  position: relative;
`

export const Content = styled.div`
  margin-top: 5%;
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 3%;

  .ant-radio-group {
    margin-left: 20px;
  }
`
export const Search = styled(Input.Search)`
  min-width: 302px;
`

export const Action = styled.a`
  cursor: pointer;
`
export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const Create = styled(Button)`
  display: flex;
  align-items: center;
  position: fixed;
  right: 20px;
  bottom: 20px;

  svg {
    margin-right: 5px;
  }
`
