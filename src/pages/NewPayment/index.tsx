import React, { useEffect, useState } from 'react'
import { Row, Form, Col, Button, AutoComplete, notification } from 'antd'
import { Menu, Header } from '../../components'
import 'moment/locale/pt-br'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CurrencyInput from 'react-currency-input'

import * as S from './styles'
import { Definitions } from '../../core/types'
import { ContributorService, PaymentService } from '../../services'
import { routes } from '../../routes'
import { useHistory } from 'react-router-dom'

interface CurrencyState {
  mask: string
  value: number
}

interface AutoCompleteType {
  value: string
  id: number
}

export default function NewPayment() {
  const history = useHistory()

  const initialCurrencyState: CurrencyState = { mask: '0.00', value: 0 }
  const poolId = Number(window.localStorage.getItem('poolId'))

  const [salary, setSalary] = useState<CurrencyState>(initialCurrencyState)
  const [leader, setLeader] = useState<CurrencyState>(initialCurrencyState)
  const [bonus, setBonus] = useState<CurrencyState>(initialCurrencyState)
  const [goal, setGoal] = useState<CurrencyState>(initialCurrencyState)
  const [rent, setRent] = useState<CurrencyState>(initialCurrencyState)
  const [taxi, setTaxi] = useState<CurrencyState>(initialCurrencyState)
  const [fine, setFine] = useState<CurrencyState>(initialCurrencyState)
  const [total, setTotal] = useState<CurrencyState>({
    mask: 'R$ 0.00',
    value: 0,
  })

  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    AutoCompleteType[]
  >([])
  const [autoCompleteValue, setAutoCompleteValue] = useState('')
  const [contributor, setContributor] = useState<
    Definitions['Contributor'] | undefined
  >()

  const [contributors, setContributors] = useState<
    Definitions['Contributor'][]
  >([])

  async function loadContributors(name = '') {
    try {
      const response = await ContributorService.getAll({
        poolId,
        params: { name, enabled: true },
      })

      const options: AutoCompleteType[] = []

      response.data.forEach(c => {
        options.push({
          id: c.id,
          value: `${c.id} - ${c.name}`,
        })
      })

      setContributors(response.data)
      setAutoCompleteOptions(options)
    } catch (error) {
      console.log('[loadContributors] Error -', error)
    }
  }

  function handleSearch(searchText: string) {
    // Buscar novos contribuidores
    console.log('Search for', searchText)
  }

  function handleSelect(data: string, option: any) {
    const selectedContributor = contributors.find(c => c.id === option.id)

    setAutoCompleteValue(data)
    setContributor(selectedContributor)
  }

  function handleChange(data: string) {
    setAutoCompleteValue(data)
  }

  async function handleSave() {
    if (!contributor) return

    try {
      await PaymentService.create({
        id: 0,
        contributorId: contributor.id || 0,
        poolId,
        salary: salary.value,
        leader: leader.value,
        bonus: bonus.value,
        goal: goal.value,
        rent: rent.value,
        taxi: taxi.value,
        fine: fine.value,
        total: total.value,
      })
      notification.success({
        message: 'Salvo com Sucesso!',
        description: `Matricula: ${contributor.id}, Total: ${total.mask}`,
      })
      history.push(routes.payment)
    } catch (error) {
      notification.error({
        message: 'Erro Interno',
        description: `erro ao tentar salvar: ${error}`,
      })
    }
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

    setTotal({
      value,
      mask: value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    })
  }, [salary, leader, bonus, goal, rent, taxi, fine])

  useEffect(() => {
    loadContributors(autoCompleteValue)
  }, [autoCompleteValue])

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
                    {
                      required: true,
                      message: 'Por favor, informe um contribuidor',
                    },
                  ]}
                >
                  <AutoComplete
                    options={autoCompleteOptions}
                    value={autoCompleteValue}
                    placeholder="Contribuidor"
                    onChange={handleChange}
                    onSearch={handleSearch}
                    onSelect={handleSelect}
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

            <h2>Auxílio</h2>

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
                Total: <strong>{total.mask}</strong>
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
