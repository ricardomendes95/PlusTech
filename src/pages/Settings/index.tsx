import { Form, Input, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { Menu, Header, Alert } from '../../components'
import { AuthService } from '../../services'
import * as S from './styles'

export default function Settings() {
  const [oldUser, setOldUser] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [oldPasswordValid, setOldPasswordValid] = useState('')
  const [newUser, setnewUser] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [newPasswordAfirm, setnewPasswordAfirm] = useState('')
  const [error, setError] = useState('')

  async function handleSave() {
    setError('')

    if (
      !oldUser ||
      !oldPassword ||
      !newUser ||
      !newPassword ||
      !newPasswordAfirm
    ) {
      setError('Preencha todos os campos!')
      return
    }

    if (oldPassword !== oldPasswordValid) {
      setError('Senha atual inválida!')
      return
    }

    if (newPassword !== newPasswordAfirm) {
      setError('Senhas não coferem!')
      return
    }

    try {
      await AuthService.update({
        oldLogin: oldUser,
        newLogin: newUser,
        oldPassword: oldPassword,
        newPassword,
      })
      notification.success({
        message: 'Salvo',
      })
    } catch (error) {
      notification.error({
        message: 'Erro Salvar',
        description: error,
      })
    }
  }

  async function loadUser() {
    try {
      const { data } = await AuthService.show()
      setOldUser(data.login)
      setOldPasswordValid(data.password)
    } catch (error) {
      notification.error({
        message: 'Erro Ao obter Dados do Banco',
        description: error,
      })
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <S.Container>
      <Menu active="settings">
        <Header text="Configurações" />
        <S.Content>
          <Form
            layout="vertical"
            onFinish={handleSave}
            fields={[{ name: 'oldUser', value: oldUser }]}
          >
            <Form.Item label="Nome do Usuário atual" name="oldUser">
              <Input
                disabled={true}
                onChange={e => setOldUser(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Senha atual" name="oldPassword">
              <Input.Password onChange={e => setOldPassword(e.target.value)} />
            </Form.Item>

            <Form.Item label="Novo Usuário" name="newUser">
              <Input onChange={e => setnewUser(e.target.value)} />
            </Form.Item>

            <Form.Item label="Nova Senha" name="newPassword">
              <Input.Password onChange={e => setnewPassword(e.target.value)} />
            </Form.Item>

            <Form.Item label="Confirme a nova senha" name="newPasswordAfirm">
              <Input.Password
                onChange={e => setnewPasswordAfirm(e.target.value)}
              />
            </Form.Item>

            {error && <Alert text={error} kind="error" />}

            <S.Save type="primary" onClick={handleSave}>
              Salvar
            </S.Save>
          </Form>
        </S.Content>
      </Menu>
    </S.Container>
  )
}
