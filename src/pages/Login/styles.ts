import styled from 'styled-components'
import { Input } from 'antd'

export const Title = styled.h1`
  color: white;
  > strong {
    color: #7A13AA;
  }
`

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #282A36;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

`

export const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;

  width:400px;
  padding: 20px 0;
  button {
    margin-top: 10px;
    width: 200px;
  }  
`
export const UserInput = styled(Input)`
    margin-bottom: 20px;
  
`
export const PasswordInput = styled(Input.Password)`
    margin-bottom: 10px;
`
