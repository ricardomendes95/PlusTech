import React, { useState } from 'react'

import {
  AiOutlineTeam,
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlineSwap,
  // AiOutlineSetting,
  AiOutlineLogout,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { routes } from '../../routes'

import * as S from './styles'

interface MenuProps {
  active?: 'home' | 'settings' | 'movement' | 'none'
}

export const Menu: React.FC<MenuProps> = ({ active = 'none', children }) => {
  const [open, setOpen] = useState(
    window.localStorage.getItem('open') === 'true',
  )

  function handleToggleMenu() {
    setOpen(prevState => {
      window.localStorage.setItem('open', prevState ? 'false' : 'true')
      return !prevState
    })
  }

  return (
    <S.Container>
      <S.Menu open={open}>
        <S.MenuItem active={false}>
          <a onClick={handleToggleMenu}>
            {open ? (
              <AiOutlineMenuFold size={50} />
            ) : (
              <AiOutlineMenuUnfold size={50} />
            )}
          </a>
        </S.MenuItem>

        <S.MenuItem active={active === 'home'}>
          <Link to={routes.home}>
            <AiOutlineTeam
              style={{ paddingRight: open ? '16px' : '0px' }}
              size={open ? 45 : 50}
            />
            {open && <span>Colaborador</span>}
          </Link>
        </S.MenuItem>

        <S.MenuItem active={active === 'movement'}>
          <Link to={routes.payment}>
            <AiOutlineSwap
              style={{ paddingRight: open ? '16px' : '0px' }}
              size={open ? 45 : 50}
            />
            {open && <span>Movimentação</span>}
          </Link>
        </S.MenuItem>

        {/* <S.MenuItem active={active === 'settings'}>
          <Link to={routes.settings}>
            <AiOutlineSetting style={{ paddingRight: open ? '16px' : '0px' }} size={open ? 45 : 50} />
            {open && <span>Configuração</span>}
          </Link>
        </S.MenuItem> */}

        <S.MenuItem active={false}>
          <Link to={routes.login}>
            <AiOutlineLogout
              style={{ paddingRight: open ? '16px' : '0px' }}
              size={open ? 45 : 50}
            />
            {open && <span>Sair</span>}
          </Link>
        </S.MenuItem>
      </S.Menu>
      <S.Content open={open}>{children}</S.Content>
    </S.Container>
  )
}
