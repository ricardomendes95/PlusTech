import styled from 'styled-components'
import { Col, Form as FormAntd } from 'antd'

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .ant-form {
    width: 100vw;
    align-items: center;
    margin-top: 5%;
  }
`
export const Form = styled(FormAntd)`
  height: 100%;
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
`

export const Divider = styled.hr`
  margin-bottom: 20px;
`

export const Total = styled.span`
  font-size: 20px;

  strong {
    color: red;
    font-size: 20px;
  }
`

export const Footer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  padding: 20px;

  border-top: 1px solid black;
`

export const NewField = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  input {
    margin-right: 10px;
  }
  button {
    margin-right: 10px;
  }
`

export const ColPlus = styled(Col)`
  display: flex;
  align-items: center;
  margin-top: 5px;
`
