import React, { FormEvent, useEffect, useState } from 'react'
import { Button, notification } from 'antd'

import * as S from './styles'
import { useHistory } from 'react-router-dom'
import { Alert } from '../../components'
import { AuthService } from '../../services'
import { routes } from '../../routes'

export default function Login() {
  const history = useHistory()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [passwordValid, setPasswordValid] = useState('')

  async function loadUser() {
    try {
      const { data } = await AuthService.show()

      if (!data) {
        const user = await AuthService.create({
          login: 'admin',
          password: 'admin',
        })
        setUser(user.data.login)
        setPassword(user.data.password)
        setPasswordValid(user.data.password)
        return
      }

      setUser(data.login)
      setPasswordValid(data.password)
    } catch (error) {
      notification.error({
        message: 'Erro Ao obter Dados do Banco',
        description: error,
      })
    }
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (!user || !password) {
      setError('insira todos os campos!')
      return
    }

    console.log('senhas', passwordValid, password)

    if (passwordValid !== password) {
      setError('Senha Inválida!')
      return
    }

    try {
      await AuthService.login({ login: user, password })

      history.push(routes.pool)
    } catch (error) {
      console.log('Error', error)
      notification.error({
        message: 'Erro ao fazer login',
        description: error,
      })
      // setError(error)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

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
