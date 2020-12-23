/**
 *
 * Alert
 *
 */
import React from 'react'

import * as S from './styles'

export type AlertTypes = 'error' | 'success'

interface AlertProps {
  text: React.ReactNode
  kind?: AlertTypes
}

export const Alert = ({ text, kind = 'success' }: AlertProps) => (
  <S.Alert kind={kind}>{text}</S.Alert>
)
