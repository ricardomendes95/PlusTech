import { createGlobalStyle } from 'styled-components'

import 'antd/dist/antd.css'
import { Colors } from './colors'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #E1E1E6;
    background-color: ${Colors.grey.tint200}

  }
`
