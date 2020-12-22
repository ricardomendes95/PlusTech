import React from 'react'
import { useHistory } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'

import * as S from './styles'

interface HeaderProps {
  text?: string
  showBackButton?: boolean
}

export const Header = ({ text, showBackButton }: HeaderProps) => {
  const history = useHistory()

  return (
    <S.Container>
      <S.TitleWrapper>
        {showBackButton && (
          <a onClick={() => history.goBack()}>
            <IoMdArrowRoundBack size={30} />
          </a>
        )}
        <S.Title>{text}</S.Title>
      </S.TitleWrapper>
      <S.Hr />
    </S.Container>
  )
}
