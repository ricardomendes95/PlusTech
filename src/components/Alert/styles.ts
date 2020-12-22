import styled, { css } from 'styled-components'
import { AlertTypes } from '.'

export interface AlertProps {
  kind: AlertTypes
}

export const Alert = styled.span<AlertProps>`
  padding:10px 0;
  width: 100%;
  border-radius: 4px;
  text-align: center;
 
  ${({ kind }) => {
    switch (kind) {
      case 'error':
        return css`
          color: #721c24;
          background-color: #F8D7DB;
        `
      case 'success':
        return css`
          color: #165724;
          background-color: #D4EDDA;
        `
    }
  }}
`
