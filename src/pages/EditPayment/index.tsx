import React, { useEffect, useState } from 'react'
import { Row, Form, Col, Button, AutoComplete, Input } from 'antd'
import { Menu, Header } from '../../components'
import 'moment/locale/pt-br'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CurrencyInput from 'react-currency-input'
import { FaCheck, FaPlus } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'

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

interface additionalField {
  id?: number
  title?: string
  value?: CurrencyState
}

export default function EditPayment() {
  const history = useHistory()
  const location = useLocation<{ payment: Definitions['Payment'] }>()

  const payment = location.state.payment || {}

  const initialCurrencyState: CurrencyState = { mask: '0.00', value: 0 }
  const poolId = Number(window.localStorage.getItem('poolId'))

  const [addAdditionalValue, setAddAdditionalValue] = useState(false)
  const [additionalValueTemp, setAdditionalValueTemp] = useState('')

  const [fineTemp, setFineTemp] = useState('')
  const [addFine, setAddFine] = useState(false)

  const [salary, setSalary] = useState<CurrencyState>(initialCurrencyState)
  const [leader, setLeader] = useState<CurrencyState>(initialCurrencyState)
  const [bonus, setBonus] = useState<CurrencyState>(initialCurrencyState)
  const [goal, setGoal] = useState<CurrencyState>(initialCurrencyState)
  const [rent, setRent] = useState<CurrencyState>(initialCurrencyState)
  const [taxi, setTaxi] = useState<CurrencyState>(initialCurrencyState)
  const [fine, setFine] = useState<CurrencyState>(initialCurrencyState)
  const [total, setTotal] = useState<CurrencyState>({
    mask: '$ 0.00',
    value: 0,
  })

  const [focusAux, setFocusAux] = useState(false)
  const [focus, setFocus] = useState(false)

  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    AutoCompleteType[]
  >([])
  const [autoCompleteValue, setAutoCompleteValue] = useState('')
  const [contributor, setContributor] = useState<
    Definitions['Contributor'] | undefined
  >(payment.contributor)

  const [additionalFines, setAdditionalFines] = useState<
    Definitions['AdditionalAttributes'][]
  >([])

  const [additionalAids, setAdditionalAids] = useState<
    Definitions['AdditionalAttributes'][]
  >([])

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
    const additionalAidsFinal: Definitions['AdditionalAttributesFinal'][] = []
    const additionalFinesFinal: Definitions['AdditionalAttributesFinal'][] = []

    if (!contributor) return

    if (additionalAids) {
      additionalAids.map(aid => {
        additionalAidsFinal.push({
          id: aid.id,
          title: aid.title,
          value: aid.value?.value,
        })
      })
    }

    if (additionalFines) {
      additionalFines.map(fine => {
        additionalFinesFinal.push({
          id: fine.id,
          title: fine.title,
          value: fine.value?.value,
        })
      })
    }

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
        additionalFines: additionalFinesFinal,
        additionalAids: additionalAidsFinal,
      })

      history.push(routes.payment)
    } catch (error) {
      console.log('Error', error)
    }
  }

  function handleAdditionalAidChange(value: additionalField) {
    setAdditionalAids(prevState =>
      prevState.map(p => (p.title === value.title ? value : p)),
    )
  }

  function handleAdditionalValue() {
    if (!additionalAids.find(f => f.title === additionalValueTemp)) {
      additionalAids.push({
        title: additionalValueTemp,
        value: initialCurrencyState,
      })
    }
    setAdditionalValueTemp('')
    setAddAdditionalValue(false)
  }

  function handleFinesChange(value: additionalField) {
    setAdditionalFines(prevState =>
      prevState.map(p => (p.title === value.title ? value : p)),
    )
  }

  function handleFine() {
    if (!additionalFines.find(f => f.title === fineTemp)) {
      additionalFines.push({ title: fineTemp, value: initialCurrencyState })
    }
    setFineTemp('')
    setAddFine(false)
  }

  useEffect(() => {
    loadContributors(autoCompleteValue)

    const payment: Definitions['Payment'] = location.state.payment

    if (payment) {
      payment.additionalAids?.forEach(pay => {
        additionalAids.push({
          id: pay.id,
          title: pay.title,
          value: {
            mask: `$ ${pay.value}`,
            value: Number(pay.value),
          },
        })
      })
      payment.additionalFines?.forEach(pay => {
        additionalFines.push({
          id: pay.id,
          title: pay.title,
          value: {
            mask: `$ ${pay.value}`,
            value: Number(pay.value),
          },
        })
      })
    }

    setSalary({
      value: Number(payment.salary),
      mask: `$ ${payment.salary}`,
    })
    setLeader({
      value: Number(payment.leader),
      mask: `$ ${payment.leader}`,
    })
    setBonus({
      value: Number(payment.bonus),
      mask: `$ ${payment.bonus}`,
    })
    setGoal({
      value: Number(payment.goal),
      mask: `$ ${payment.goal}`,
    })
    setRent({
      value: Number(payment.rent),
      mask: `$ ${payment.rent}`,
    })
    setTaxi({
      value: Number(payment.taxi),
      mask: `$ ${payment.taxi}`,
    })
    setFine({
      value: Number(payment.fine),
      mask: `$ ${payment.fine}`,
    })
  }, [])

  useEffect(() => {
    let fineValues = fine.value
    additionalFines.forEach(f => {
      fineValues += Number(f.value?.value)
    })

    let aidValues = 0
    additionalAids.forEach(a => {
      aidValues += Number(a.value?.value)
    })

    const value =
      salary.value +
      leader.value +
      bonus.value +
      goal.value +
      rent.value +
      aidValues +
      taxi.value -
      fineValues

    setTotal({
      value,
      mask: value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    })
  }, [
    salary,
    leader,
    bonus,
    goal,
    rent,
    taxi,
    fine,
    additionalFines,
    additionalAids,
  ])

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
                  prefix="$ "
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
                  prefix="$ "
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
                  prefix="$ "
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
                  prefix="$ "
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
                  prefix="$ "
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
                  prefix="$ "
                  className="ant-input"
                />
              </Form.Item>
            </Col>

            {!addAdditionalValue && (
              <S.ColPlus sm={10} md={6} lg={5} xl={5}>
                <Button
                  onClick={() => {
                    setAddAdditionalValue(true)
                    setFocusAux(true)
                  }}
                  type="primary"
                >
                  <FaPlus />
                </Button>
              </S.ColPlus>
            )}
          </Row>

          {additionalAids.length > 0 &&
            additionalAids.map(addValue => (
              <Row gutter={[16, 0]} key={addValue.title}>
                <Col sm={10} md={6} lg={5} xl={5}>
                  <Form.Item label={addValue.title}>
                    <CurrencyInput
                      value={addValue.value?.mask}
                      onChangeEvent={(_: any, mask: any, value: any) =>
                        handleAdditionalAidChange({
                          id: addValue.id,
                          title: addValue.title,
                          value: { mask, value },
                        })
                      }
                      prefix="$ "
                      className="ant-input"
                    />
                  </Form.Item>
                </Col>
              </Row>
            ))}

          {addAdditionalValue && (
            <Row>
              <Col sm={8} md={6} lg={8} xl={6}>
                <S.NewField>
                  <Input
                    onChange={e => setAdditionalValueTemp(e.target.value)}
                    placeholder="Ex: Auxilio adicional"
                    autoFocus={focusAux}
                    onPressEnter={handleAdditionalValue}
                  />
                  <Button
                    type="primary"
                    danger
                    onClick={() => setAddAdditionalValue(false)}
                  >
                    <IoCloseSharp size={20} />
                  </Button>
                  <Button type="primary" onClick={handleAdditionalValue}>
                    <FaCheck />
                  </Button>
                </S.NewField>
              </Col>
            </Row>
          )}

          <h2>Multas</h2>

          <S.Divider />

          <Row gutter={[16, 0]}>
            <Col sm={10} md={6} lg={5} xl={5}>
              <Form.Item label="Multas" name="fine">
                <CurrencyInput
                  value={fine.mask}
                  onChangeEvent={(_: any, mask: any, value: any) =>
                    setFine({ mask, value })
                  }
                  prefix="$ "
                  className="ant-input"
                />
              </Form.Item>
            </Col>
            {!addFine && (
              <S.ColPlus sm={10} md={6} lg={5} xl={5}>
                <Button
                  onClick={() => {
                    setAddFine(true)
                    setFocus(true)
                  }}
                  type="primary"
                >
                  <FaPlus />
                </Button>
              </S.ColPlus>
            )}
          </Row>

          {additionalFines.length > 0 &&
            additionalFines.map(penalty => (
              <Row gutter={[16, 0]} key={penalty.title}>
                <Col sm={10} md={6} lg={5} xl={5}>
                  <Form.Item label={penalty.title}>
                    <CurrencyInput
                      value={penalty.value?.mask}
                      onChangeEvent={(_: any, mask: any, value: any) =>
                        handleFinesChange({
                          id: penalty.id,
                          title: penalty.title,
                          value: { mask, value },
                        })
                      }
                      prefix="$ "
                      className="ant-input"
                    />
                  </Form.Item>
                </Col>
              </Row>
            ))}

          {addFine && (
            <Row>
              <Col sm={8} md={6} lg={8} xl={6}>
                <S.NewField>
                  <Input
                    onChange={e => setFineTemp(e.target.value)}
                    placeholder="Ex: Multa adicional"
                    autoFocus={focus}
                    onPressEnter={handleFine}
                  />
                  <Button
                    type="primary"
                    danger
                    onClick={() => setAddFine(false)}
                  >
                    <IoCloseSharp size={20} />
                  </Button>
                  <Button type="primary" onClick={handleFine}>
                    <FaCheck />
                  </Button>
                </S.NewField>
              </Col>
            </Row>
          )}

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
