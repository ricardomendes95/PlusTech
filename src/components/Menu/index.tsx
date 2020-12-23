import React, { useState } from 'react'

import {
  AiOutlineTeam,
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlineSwap,
  AiOutlineSetting,
} from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'

import * as S from './styles'

interface MenuProps {
  active?: 'home' | 'settings' | 'moving' | 'none'
}

export const Menu: React.FC<MenuProps> = ({ active = 'none', children }) => {
  const location = useLocation<{ open: boolean }>()
  const [open, setOpen] = useState(location.state?.open)

  return (
    <S.Container>
      <S.Menu open={open}>
        <S.MenuItem active={false}>
          <a onClick={() => setOpen(prevState => !prevState)}>
            {open ? (
              <AiOutlineMenuFold size={50} />
            ) : (
              <AiOutlineMenuUnfold size={50} />
            )}
          </a>
        </S.MenuItem>

        <S.MenuItem active={active === 'home'}>
          <Link to={{ pathname: '/home', state: { open } }}>
            <AiOutlineTeam size={50} />
            {open && <span>Colaborador</span>}
          </Link>
        </S.MenuItem>

        <S.MenuItem active={active === 'moving'}>
          <Link to={{ pathname: '/home', state: { open } }}>
            <AiOutlineSwap size={50} />
            {open && <span>Movimentação</span>}
          </Link>
        </S.MenuItem>

        <S.MenuItem active={active === 'settings'}>
          <Link to={{ pathname: '/settings', state: { open } }}>
            <AiOutlineSetting size={50} />
            {open && <span>Configuração</span>}
          </Link>
        </S.MenuItem>
      </S.Menu>
      <S.Content open={open}>{children}</S.Content>
    </S.Container>
  )
}
