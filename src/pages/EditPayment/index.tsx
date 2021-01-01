import React, { useEffect, useState } from 'react'
import { Row, Form, Col, Button, AutoComplete } from 'antd'
import { Menu, Header } from '../../components'
import 'moment/locale/pt-br'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CurrencyInput from 'react-currency-input'

import * as S from './styles'
import { Definitions } from '../../core/types'
import { ContributorService, PaymentService } from '../../services'
import { routes } from '../../routes'
import { useHistory, useLocation } from 'react-router-dom'

interface CurrencyState {
  mask: string
  value: number
}

interface AutoCompleteType {
  value: string
  id: number
}

export default function EditPayment() {
  const history = useHistory()
  const location = useLocation<{ payment: Definitions['Payment'] }>()

  const payment = location.state.payment || {}

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
  >(payment.contributor)

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

      if (payment && !options.find(c => c.id === payment.contributor?.id)) {
        options.push({
          id: payment.contributor?.id || 0,
          value: `${payment.contributor?.id} - ${payment.contributor?.name}`,
        })

        setAutoCompleteValue(
          `${payment.contributor?.id} - ${payment.contributor?.name}`,
        )
      }

      setContributors(response.data)
      setAutoCompleteOptions(options)
    } catch (error) {
      console.log('[loadContributors] Error -', error)
    }
  }

  function handleSearch(searchText: string) {
    loadContributors(searchText)
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
      await PaymentService.update({
        id: location.state.payment.id,
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

      history.push(routes.payment)
    } catch (error) {
      console.log('Error', error)
    }
  }

  useEffect(() => {
    loadContributors(autoCompleteValue)

    const payment = location.state.payment

    setSalary({
      value: Number(payment.salary),
      mask: `R$ ${payment.salary}`,
    })
    setLeader({
      value: Number(payment.leader),
      mask: `R$ ${payment.leader}`,
    })
    setBonus({
      value: Number(payment.bonus),
      mask: `R$ ${payment.bonus}`,
    })
    setGoal({
      value: Number(payment.goal),
      mask: `R$ ${payment.goal}`,
    })
    setRent({
      value: Number(payment.rent),
      mask: `R$ ${payment.rent}`,
    })
    setTaxi({
      value: Number(payment.taxi),
      mask: `R$ ${payment.taxi}`,
    })
    setFine({
      value: Number(payment.fine),
      mask: `R$ ${payment.fine}`,
    })
  }, [])

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

  return (
    <Menu active="movement">
      <Header text="Editar Pagamento" showBackButton />

      <S.Content>
        <S.Form
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            contributor: `${payment.contributor?.id} - ${payment.contributor?.name}`,
          }}
          fields={[
            { name: ['salary'], value: salary.mask },
            { name: ['leader'], value: leader.mask },
            { name: ['bonus'], value: bonus.mask },
            { name: ['goal'], value: goal.mask },
            { name: ['rent'], value: rent.mask },
            { name: ['taxi'], value: taxi.mask },
            { name: ['fine'], value: fine.mask },
          ]}
        >
          <Form.Item
            label="Nome"
            name="contributor"
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
              <Form.Item label="Lider de Equipe" name="leader">
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

          <S.Footer>
            <S.Total>
              Total: <strong>{total.mask}</strong>
            </S.Total>

            <Button htmlType="submit" type="primary" size="large">
              Salvar
            </Button>
          </S.Footer>
        </S.Form>
      </S.Content>
    </Menu>
  )
}
