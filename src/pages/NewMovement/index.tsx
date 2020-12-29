import React, { useState } from 'react'
import { Input, Row, Form, Col, Button } from 'antd'
import { Menu, Header } from '../../components'
import 'moment/locale/pt-br'

import * as S from './styles'

export interface PoolTypes {
  id: number
  name: string
}

export default function NewMovement() {
  const [id, setId] = useState<number>()
  const [name, setName] = useState<string>()
  const [dateAdmission] = useState<Date | null>(new Date())
  const [leader, setLeader] = useState<string>()
  const [wallet, setWallet] = useState<string>()

  function handleSave() {
    // event.preventDefault()
    console.log(id, name, leader, wallet, dateAdmission)
  }
  return (
    <S.Container>
      <Menu active="home">
        <Header text="Novo Colaborador" showBackButton />
        <S.Content>
          <Form layout="vertical" onFinish={handleSave}>
            <Row>
              <Col sm={20} md={20} lg={20} xl={16}>
                <Form.Item
                  label="Nome"
                  name="Nome"
                  rules={[
                    { required: true, message: 'Por favor insira um Nome!' },
                  ]}
                >
                  <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ex: João"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Salário">
                  <Input
                    value={id}
                    onChange={e => setId(Number(e.target.value))}
                    placeholder="1.500,00"
                  />
                </Form.Item>
              </Col>
            </Row>
            <h2>Bônus</h2>
            <hr />
            <Row gutter={[16, 0]}>
              <Col sm={14} md={10} lg={12} xl={11}>
                <Form.Item label="Lider de Equipe" name="lider">
                  <Input
                    value={leader}
                    onChange={e => setLeader(e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={20} md={20} lg={20} xl={16}>
                <Form.Item
                  label="Carteira"
                  name="Carteira"
                  rules={[
                    {
                      max: 50,
                      message: 'Valor não pode ser maior que 50 caracters',
                    },
                  ]}
                >
                  <Input
                    value={wallet}
                    onChange={e => setWallet(e.target.value)}
                    placeholder="12f1241s12..."
                    maxLength={50}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col
                style={{ display: 'flex', justifyContent: 'flex-end' }}
                sm={20}
                md={20}
                lg={20}
                xl={16}
              >
                <Button htmlType="submit" type="primary">
                  Salvar
                </Button>
              </Col>
            </Row>
          </Form>
        </S.Content>
      </Menu>
    </S.Container>
  )
}
