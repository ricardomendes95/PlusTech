import { Button } from 'antd'
import styled from 'styled-components'
import { Colors } from '../../styles/colors'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${Colors.base.secondary.tint800};
`

export const Title = styled.h1`
  font: 700 50px Roboto, sans-serif;
  color: ${Colors.white};
`

export const PoolsWrapper = styled.div``

export const PoolCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 8px;
  margin-bottom: 16px;
  width: 300px;
  justify-content: center;
  height: 80px;
  padding: 0px 20px;

  a:first-child {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    font-size: 20px;
    :hover {
      /* background-color: rgba(0,0,0, .2) */
      background-color: ${Colors.base.secondary.tint400};
    }
  }
  background-color: ${Colors.base.secondary.tint300};

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    button {
      margin-left: 6px;
      margin-right: 6px;
      background-color: Transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      overflow: hidden;
      :hover {
        /* background-color: rgba(0,0,0, .2) */
        background-color: ${Colors.base.secondary.tint400};
      }
    }
  }
`

export const PlusButton = styled(Button)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
`
