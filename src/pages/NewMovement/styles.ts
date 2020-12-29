import styled from 'styled-components'
import { Col } from 'antd'

export const Container = styled.div``
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-form {
    width: 100vw;
    align-items: center;
    margin-top: 5%;
  }
`

export const ColDiv = styled(Col)`
  padding: 0px 5px 0px;
`
export const Col1 = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
  width: 100vw;
`
export const Row = styled.div`
  display: flex;
  align-items: center;
  /* margin-top: 10px; */
`
