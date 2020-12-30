import {
  Input,
  Row,
  Form,
  Col,
  Select,
  DatePicker,
  ConfigProvider,
  Button,
  notification,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { Menu, Header } from '../../components'
import moment from 'moment'
import 'moment/locale/pt-br'
import locale from 'antd/lib/locale/pt_BR'

import * as S from './styles'
import { ContributorService, PoolService } from '../../services'
import { Definitions } from '../../core/types'
import { useHistory } from 'react-router-dom'
import { routes } from '../../routes'

export default function EditContributor() {
  const [id, setId] = useState(0)
  const [poolId, setPoolId] = useState(window.localStorage.getItem('poolId'))
  const [name, setName] = useState('')
  const [dateAdmission, setDateAdmission] = useState(new Date())
  const [email, setEmail] = useState('')
  const [wallet, setWallet] = useState('')

  const history = useHistory()

  const [poolsOptions, setPoolsOptions] = useState<Definitions['Pool'][]>([])

  async function loadPools() {
    try {
      const { data } = await PoolService.getAll()

      setPoolsOptions(data)
    } catch (error) {
      console.log(error)
    }
  }

  function handleSelectPool(value: string) {
    const idPool = poolsOptions?.find(opt => opt.name === value)?.id || ''
    setPoolId(String(idPool))
  }

  async function handleSave() {
    try {
      const { data: contributor } = await ContributorService.create({
        name,
        poolId: Number(poolId),
        admissionDate: dateAdmission,
        email,
        wallet,
      })
      notification.success({
        message: 'Salvo com Sucesso!',
        description: `Matricula: ${contributor.id}, Colaborador: ${contributor.name}`,
      })
      history.push(routes.home)
    } catch (error) {
      notification.error({
        message: 'Erro Interno',
        description: 'erro ao tentar salvar',
      })
    }
  }

  useEffect(() => {
    loadPools()
  }, [])

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

              <Col sm={10} md={8} lg={8} xl={5}>
                <Form.Item label="Pool">
                  <Select value={String(poolId)} onChange={handleSelectPool}>
                    {poolsOptions?.map(pool => (
                      <Select.Option key={pool.id} value={String(pool.id)}>
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
                      onChange={e =>
                        setDateAdmission(e?.toDate() || new Date())
                      }
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
