import { Button } from 'antd'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const Title = styled.h1``

export const PoolsWrapper = styled.div``

export const PoolCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 8px;
  margin-bottom: 16px;
  width: 300px;
  justify-content: space-between;
  height: 80px;
  padding: 0px 20px;

  a:first-child {
    width: 100%;
    height: 100%;
    margin-right: 12px;
    display: flex;
    align-items: center;
  }
`

export const PlusButton = styled(Button)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
`
