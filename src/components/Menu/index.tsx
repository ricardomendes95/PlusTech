import React, { useState } from 'react'

import {
  AiOutlineTeam,
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlineSwap,
  AiOutlineSetting,
  AiOutlineLogout,
} from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../routes'

import * as S from './styles'

interface MenuProps {
  active?: 'home' | 'settings' | 'movement' | 'none'
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
          <Link to={{ pathname: routes.home, state: { open } }}>
            <AiOutlineTeam size={50} />
            {open && <span>Colaborador</span>}
          </Link>
        </S.MenuItem>

        <S.MenuItem active={active === 'movement'}>
          <Link to={{ pathname: routes.movement, state: { open } }}>
            <AiOutlineSwap size={50} />
            {open && <span>Movimentação</span>}
          </Link>
        </S.MenuItem>

        <S.MenuItem active={active === 'settings'}>
          <Link to={{ pathname: routes.settings, state: { open } }}>
            <AiOutlineSetting size={50} />
            {open && <span>Configuração</span>}
          </Link>
        </S.MenuItem>

        <S.MenuItem active={false}>
          <Link to={{ pathname: routes.login, state: { open } }}>
            <AiOutlineLogout size={50} />
            {open && <span>Sair</span>}
          </Link>
        </S.MenuItem>
      </S.Menu>
      <S.Content open={open}>{children}</S.Content>
    </S.Container>
  )
}
