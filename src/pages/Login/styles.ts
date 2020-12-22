import styled from 'styled-components'
import { Input } from 'antd'
import { Colors } from '../../styles/colors'

export const Title = styled.h1`
  color: white;
  font: 700 50px Roboto, sans-serif;
  > strong {
    color: ${Colors.base.primary.tint100};
  }
`

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${Colors.base.secondary.tint800};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 400px;
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
