import {
  Input,
  Row,
  Form,
  Col,
  Select,
  DatePicker,
  ConfigProvider,
  Button,
} from 'antd'
import React, { useState } from 'react'
import { Menu, Header } from '../../components'
import moment from 'moment'
import 'moment/locale/pt-br'
import locale from 'antd/lib/locale/pt_BR'

import * as S from './styles'

export interface PoolTypes {
  id: number
  name: string
}

export default function NewContributor() {
  const [id, setId] = useState<number>()
  const [pool, setPool] = useState<number | null>(1)
  const [name, setName] = useState<string>()
  const [dateAdmission, setDateAdmission] = useState<Date | null>(new Date())
  const [email, setEmail] = useState<string>()
  const [wallet, setWallet] = useState<string>()

  const poolsOptions: PoolTypes[] = [
    { id: 1, name: 'pool 1' },
    { id: 2, name: 'pool 2' },
    { id: 3, name: 'pool 3' },
  ]

  function handleSelectPool(value: string) {
    const idPool = poolsOptions.find(opt => opt.name === value)?.id || null
    setPool(idPool)
  }

  function handleSave() {
    console.log(id, pool, name, email, wallet, dateAdmission)
  }
  return (
    <S.Container>
      <Menu active="home">
        <Header text="Novo Colaborador" showBackButton />

        <S.Content>
          <Form layout="vertical" onFinish={handleSave}>
            <Row gutter={[16, 0]}>
              <Col sm={10} md={6} lg={5} xl={5}>
                <Form.Item label="Matricula">
                  <Input
                    value={id}
                    onChange={e => setId(Number(e.target.value))}
                    placeholder="ex: 1"
                  />
                </Form.Item>
              </Col>

              <Col sm={10} md={10} lg={8} xl={5}>
                <Form.Item label="Pool">
                  <Select
                    defaultValue={poolsOptions[0].name}
                    onChange={handleSelectPool}
                  >
                    {poolsOptions.map(pool => (
                      <Select.Option key={pool.id} value={pool.name}>
                        {pool.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

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
              <Col sm={6} md={6} lg={4} xl={3}>
                <Form.Item label="Data de Admissão">
                  <ConfigProvider locale={locale}>
                    <DatePicker
                      defaultValue={moment(dateAdmission, 'DD/MM/YYYY')}
                      onChange={e => setDateAdmission(e?.toDate() || null)}
                      format={'DD/MM/YYYY'}
                    />
                  </ConfigProvider>
                </Form.Item>
              </Col>

              <Col sm={14} md={10} lg={12} xl={11}>
                <Form.Item
                  label="E-mail"
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                  ]}
                >
                  <Input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Ex: João@email.com"
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
