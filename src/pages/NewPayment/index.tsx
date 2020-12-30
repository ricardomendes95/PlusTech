import React, { useEffect, useState } from 'react'
import { Input, Row, Form, Col, Button } from 'antd'
import { Menu, Header } from '../../components'
import 'moment/locale/pt-br'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CurrencyInput from 'react-currency-input'

import * as S from './styles'

interface CurrencyState {
  mask: string
  value: number
}

export default function NewMovement() {
  const initialCurrencyState: CurrencyState = { mask: '0.00', value: 0 }

  const [id] = useState<number>()
  const [name, setName] = useState('')
  const [salary, setSalary] = useState<CurrencyState>(initialCurrencyState)
  const [leader, setLeader] = useState<CurrencyState>(initialCurrencyState)
  const [bonus, setBonus] = useState<CurrencyState>(initialCurrencyState)
  const [goal, setGoal] = useState<CurrencyState>(initialCurrencyState)
  const [rent, setRent] = useState<CurrencyState>(initialCurrencyState)
  const [taxi, setTaxi] = useState<CurrencyState>(initialCurrencyState)
  const [fine, setFine] = useState<CurrencyState>(initialCurrencyState)
  const [total, setTotal] = useState('')

  function handleSave() {
    // event.preventDefault()
    console.log(id, name, leader, bonus)
  }

  useEffect(() => {
    const value =
      salary.value +
      leader.value +
      bonus.value +
      goal.value +
      rent.value +
      taxi.value -
      fine.value

    setTotal(
      value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    )
  }, [salary, leader, bonus, goal, rent, taxi, fine])

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
                    { required: true, message: 'Por favor, informe um nome!' },
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
                  <CurrencyInput
                    value={salary.mask}
                    onChangeEvent={(_: any, mask: any, value: any) =>
                      setSalary({ mask, value })
                    }
                    prefix="R$ "
                    className="ant-input"
                  />
                  {/* <Input
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                    placeholder="1.500,00"
                  /> */}
                </Form.Item>
              </Col>
            </Row>

            <h2>Bônus</h2>

            <S.Divider />

            <Row gutter={[16, 0]}>
              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Lider de Equipe" name="lider">
                  <CurrencyInput
                    value={leader.mask}
                    onChangeEvent={(_: any, mask: any, value: any) =>
                      setLeader({ mask, value })
                    }
                    prefix="R$ "
                    className="ant-input"
                  />
                </Form.Item>
              </Col>

              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Bônus de Grupo" name="bonus">
                  <CurrencyInput
                    value={bonus.mask}
                    onChangeEvent={(_: any, mask: any, value: any) =>
                      setBonus({ mask, value })
                    }
                    prefix="R$ "
                    className="ant-input"
                  />
                </Form.Item>
              </Col>

              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Meta Pessoal" name="goal">
                  <CurrencyInput
                    value={goal.mask}
                    onChangeEvent={(_: any, mask: any, value: any) =>
                      setGoal({ mask, value })
                    }
                    prefix="R$ "
                    className="ant-input"
                  />
                </Form.Item>
              </Col>
            </Row>

            <h2>Auxilio</h2>

            <S.Divider />

            <Row gutter={[16, 0]}>
              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Aluguel" name="rent">
                  <CurrencyInput
                    value={rent.mask}
                    onChangeEvent={(_: any, mask: any, value: any) =>
                      setRent({ mask, value })
                    }
                    prefix="R$ "
                    className="ant-input"
                  />
                </Form.Item>
              </Col>

              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Táxi" name="taxi">
                  <CurrencyInput
                    value={taxi.mask}
                    onChangeEvent={(_: any, mask: any, value: any) =>
                      setTaxi({ mask, value })
                    }
                    prefix="R$ "
                    className="ant-input"
                  />
                </Form.Item>
              </Col>

              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Multas" name="fine">
                  <CurrencyInput
                    value={fine.mask}
                    onChangeEvent={(_: any, mask: any, value: any) =>
                      setFine({ mask, value })
                    }
                    prefix="R$ "
                    className="ant-input"
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
