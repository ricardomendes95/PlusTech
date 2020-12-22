import React, { FormEvent, useState } from 'react'
import { Button } from 'antd'

import * as S from './styles'
import { useHistory } from 'react-router-dom'
import { Alert } from '../../components'

export default function Login () {
  const history = useHistory()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleLogin (event: FormEvent) {
    event.preventDefault()

    if (!user || !password) {
      setError('insira todos os campos!')
      return
    }

    history.push('/home')
  }

  return (
    <S.Container>
      <S.Title><strong>PLUS</strong> TECH</S.Title>

      <S.Form onSubmit={handleLogin}>
        <S.UserInput value={user} onChange={e => setUser(e.target.value)} placeholder="Usuário"/>
        <S.PasswordInput value={password} onChange={ e => setPassword(e.target.value)} placeholder="Senha"/>

        {error && <Alert text={error} kind='error'/>}

        <Button type="primary" htmlType="submit" >Entrar</Button>
      </S.Form>
    </S.Container>
  )
}
