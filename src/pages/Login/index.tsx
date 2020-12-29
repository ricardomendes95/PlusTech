import React, { FormEvent, useState } from 'react'
import { Button } from 'antd'

import * as S from './styles'
import { useHistory } from 'react-router-dom'
import { Alert } from '../../components'
import { AuthService } from '../../services'
import { routes } from '../../routes'

export default function Login() {
  const history = useHistory()

  const [user, setUser] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [error, setError] = useState('')

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (!user || !password) {
      setError('insira todos os campos!')
      return
    }

    try {
      await AuthService.login({ login: user, password })

      history.push(routes.pool)
    } catch (error) {
      console.log('Error', error)
      // setError(error)
    }
  }

  return (
    <S.Container>
      <S.Title>
        <strong>PLUS</strong> TECH
      </S.Title>

      <S.Form onSubmit={handleLogin}>
        <S.UserInput
          value={user}
          onChange={e => setUser(e.target.value)}
          placeholder="Usuário"
        />
        <S.PasswordInput
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Senha"
        />

        {error && <Alert text={error} kind="error" />}

        <Button type="primary" htmlType="submit">
          Entrar
        </Button>
      </S.Form>
    </S.Container>
  )
}
