import React from 'react'
import * as S from './styles'

export class ComponentToPrint extends React.Component {
  constructor(props: any) {
    super(props)
    this.matricula = props.item.id
    this.name = props.item.name
    this.admissionDate = props.item.admissionDate
    this.dateEmit = props.item.createdAt
    this.email = props.item.email
    this.wallet = props.item.wallet
  }

  name
  admissionDate
  dateEmit
  email
  matricula
  wallet

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
              <S.P>{this.dateEmit}</S.P>
              <S.P>{this.admissionDate.toLocaleDateString('pt-BR')}</S.P>
              <S.P>{this.email}</S.P>
              <S.P>{this.matricula}</S.P>
              <S.P>{this.wallet}</S.P>
              <S.P>R$ 1.500,00</S.P>
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
                <S.P>R$ 200,00</S.P>
                <S.P>R$ 300,00</S.P>
                <S.P>R$ 400,00</S.P>
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
                <S.P>R$ 200,00</S.P>
                <S.P>R$ 300,00</S.P>
              </S.Right>
            </S.Drop>

            <S.Drop>
              <S.Left>
                <S.P>Multa:</S.P>
              </S.Left>
              <S.Right>
                <S.P>R$ 50,00:</S.P>
              </S.Right>
            </S.Drop>

            <S.Total className="total">
              <strong>TOTAL: 2.000,00</strong>
            </S.Total>
          </S.Payment>
        </S.Content>
      </S.Container>
    )
  }
}
