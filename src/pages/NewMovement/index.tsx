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
  const [id] = useState<number>()
  const [name, setName] = useState<string>()
  const [salary, setSalary] = useState<string>()
  const [leader, setLeader] = useState<string>()
  const [bonus, setBonus] = useState<string>()
  const [goal, setGoal] = useState<string>()
  const [rent, setRent] = useState<string>()
  const [taxi, setTaxi] = useState<string>()
  const [fine, setFine] = useState<string>()
  const [total] = useState<string>('R$12.00,00')

  function handleSave() {
    // event.preventDefault()
    console.log(id, name, leader, bonus)
  }
  return (
    <S.Container>
      <Menu active="home">
        <Header text="Novo Pagamento" showBackButton />
        <S.Content>
          <Form layout="vertical" onFinish={handleSave}>
            <Row>
              <Col sm={10} md={10} lg={10} xl={16}>
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
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                    placeholder="1.500,00"
                  />
                </Form.Item>
              </Col>
            </Row>
            <h2>Bônus</h2>
            <S.Divider />

            <Row gutter={[16, 0]}>
              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Lider de Equipe" name="lider">
                  <Input
                    value={leader}
                    onChange={e => setLeader(e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </Form.Item>
              </Col>
              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Bônus de Grupo" name="bonus">
                  <Input
                    value={bonus}
                    onChange={e => setBonus(e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </Form.Item>
              </Col>

              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Meta Pessoal" name="goal">
                  <Input
                    value={goal}
                    onChange={e => setGoal(e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </Form.Item>
              </Col>
            </Row>

            <h2>Auxilio</h2>
            <S.Divider />

            <Row gutter={[16, 0]}>
              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Aluguel" name="rent">
                  <Input
                    value={rent}
                    onChange={e => setRent(e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </Form.Item>
              </Col>

              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Táxi" name="taxi">
                  <Input
                    value={taxi}
                    onChange={e => setTaxi(e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </Form.Item>
              </Col>

              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Multas" name="fine">
                  <Input
                    value={fine}
                    onChange={e => setFine(e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <span>
                Total: <strong>{total}</strong>
              </span>
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
