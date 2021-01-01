import styled from 'styled-components'
import { Colors } from '../../styles/colors'

interface MenuProps {
  open: boolean
}
interface MenuItemProps {
  active: boolean
}

export const Container = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100vh;
`

export const Menu = styled.div<MenuProps>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: ${({ open }) => (open ? '200px' : '100px')};
  height: 100%;
  background-color: ${Colors.base.secondary.tint800};
  display: flex;
  flex-direction: column;
  align-items: ${({ open }) => (open ? 'flex-start' : 'center')};
  padding-top: 20px;
  list-style: none;
  transition: 0.1s;
  z-index: 1000;

  li:first-child {
    display: flex;
    justify-content: ${({ open }) => (open ? 'flex-end' : 'center')};
  }
`

export const Content = styled.div<MenuProps>`
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-left: ${({ open }) => (open ? '220px' : '120px')};
  transition: 0.6s;
  max-width: 100vw;
  overflow-x: hidden;
`
export const MenuItem = styled.li<MenuItemProps>`
  width: 100%;
  padding: 12px 20px;
  border-left: ${({ active }) =>
    active ? `4px solid ${Colors.base.primary.tint300}` : 'none'};
  :hover {
    background-color: ${Colors.base.secondary.tint400};
  }

  a {
    display: flex;
    align-items: center;
    color: ${Colors.base.white};
  }
`
