import { Button } from 'antd'
import styled from 'styled-components'
import { Colors } from '../../styles/colors'

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
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
  margin-bottom: 70px;
`

export const PoolsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 970px;
  height: 100%;
  background-color: ${Colors.base.secondary.tint800};
`

export const PoolCard = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  margin: 8px;
  width: 300px;
  justify-content: center;
  height: 80px;
  background-color: ${Colors.base.secondary.tint300};

  a:first-child {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    font-size: 20px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;

    :hover {
      background-color: ${Colors.base.secondary.tint400};
    }
  }

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
        background-color: ${Colors.base.secondary.tint400};
      }
    }
  }
`

export const EditCancelButton = styled.a`
  padding: 0px 12px;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: ${Colors.base.secondary.tint400};
  }

  strong {
    color: white;
  }
`

export const Input = styled.input`
  background-color: ${Colors.base.secondary.tint400};
  color: white;
  border: none;
  border-bottom: 1px solid white;
  padding: 5px 12px;
  width: 100%;
  margin: 0px 12px;

  :focus {
    background-color: ${Colors.base.secondary.tint300};
  }
`

export const Form = styled.form`
  width: 100%;
  height: 100%;
`

export const SaveButton = styled.button`
  padding: 0px 12px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: ${Colors.base.secondary.tint400};
  }
`

export const PlusButton = styled(Button)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
`
