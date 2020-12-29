import React from 'react'
import * as S from './styles'

import { Menu, Header } from '../../components'

export default function CreateContributors() {
  return (
    <Menu>
      <Header text="Novo Colaborador" />
      <S.Content>
        <h1>new colaborators</h1>
      </S.Content>
    </Menu>
  )
}
