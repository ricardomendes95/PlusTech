import React from 'react'

import * as S from './styles'

interface HeaderProps {
  text?: string
}

export const Header = ({ text }: HeaderProps) => (
  <S.Container>
    <S.Title>
      {text}
    </S.Title>
    <S.Hr/>
  </S.Container>
)
