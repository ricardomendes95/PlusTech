import React from 'react'
import { Definitions } from '../../core/types'
import * as S from './styles'

interface ComponentToPrintProps {
  item: Definitions['Payment']
}

export class ComponentToPrint extends React.Component<ComponentToPrintProps> {
  constructor(props: any) {
    super(props)
    this.matricula = props?.item.contributor?.id
    this.name = props.item.contributor.name
    this.admissionDate =
      new Date(props.item.contributor?.admissionDate) || new Date()
    this.dateEmit = new Date(props.item.createdAt) || new Date()
    this.email = props.item.contributor.email || 'Não informado'
    this.wallet = props.item.contributor.wallet || 'Não informado'
    this.salary = this.numberToReal(props.item.salary) || 'R$ 0,00'
    this.leader = this.numberToReal(props.item.leader) || 'R$ 0,00'
    this.bonus = this.numberToReal(props.item.bonus) || 'R$ 0,00'
    this.goal = this.numberToReal(props.item.goal) || 'R$ 0,00'
    this.rent = this.numberToReal(props.item.rent) || 'R$ 0,00'
    this.taxi = this.numberToReal(props.item.taxi) || 'R$ 0,00'
    this.fine = this.numberToReal(props.item.fine) || 'R$ 0,00'
    this.total = this.numberToReal(props.item.total) || 'R$ 0,00'
  }

  name = ''
  admissionDate
  dateEmit
  email
  matricula
  wallet
  salary
  leader
  bonus
  goal
  rent
  taxi
  fine
  total

  numberToReal(value: string) {
    const numero = Number(value).toFixed(2).split('.')
    numero[0] = 'R$ ' + numero[0].split(/(?=(?:...)*$)/).join('.')
    return numero.join(',')
  }

  render() {
    return (
      <S.Container>
        <S.Header>
          <strong>Guia de Comprovação</strong>
        </S.Header>
        <S.Content>
          <S.Colaborator>
            <S.Left>
              <S.P>Nome:</S.P>
              <S.P>Data de Emissão:</S.P>
              <S.P>Data de Admissão:</S.P>
              <S.P>E-mail:</S.P>
              <S.P>matricula:</S.P>
              <S.P>carteira:</S.P>
              <S.P>Salário:</S.P>
            </S.Left>
            <S.Right>
              <S.P>{this.name}</S.P>
              <S.P>{this.dateEmit.toLocaleDateString('pt-BR')}</S.P>
              <S.P>{this.admissionDate?.toLocaleDateString('pt-BR')}</S.P>
              <S.P>{this.email}</S.P>
              <S.P>{this.matricula}</S.P>
              <S.P>{this.wallet}</S.P>
              <S.P>{this.salary}</S.P>
            </S.Right>
          </S.Colaborator>
          <S.Payment>
            <h2>Bônus:</h2>
            <hr />
            <S.Drop>
              <S.Left>
                <S.P>Lider de equipe:</S.P>
                <S.P>Bônus de Grupo:</S.P>
                <S.P>Meta pessoal:</S.P>
              </S.Left>
              <S.Right>
                <S.P>{this.leader}</S.P>
                <S.P>{this.bonus}</S.P>
                <S.P>{this.goal}</S.P>
              </S.Right>
            </S.Drop>

            <h2>Auxílios</h2>
            <hr />
            <S.Drop>
              <S.Left>
                <S.P>Aluguel:</S.P>
                <S.P>Táxi:</S.P>
              </S.Left>
              <S.Right>
                <S.P>{this.rent}</S.P>
                <S.P>{this.taxi}</S.P>
              </S.Right>
            </S.Drop>

            <S.Drop>
              <S.Left>
                <S.P>Multa:</S.P>
              </S.Left>
              <S.Right>
                <S.P>{this.fine}</S.P>
              </S.Right>
            </S.Drop>

            <S.Total className="total">
              <strong>TOTAL: {this.total}</strong>
            </S.Total>
          </S.Payment>
        </S.Content>
      </S.Container>
    )
  }
}
