import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CounterPointerStyled = styled.div`
  position: fixed;
  top: ${props => 50 + props.line * 24}px;
  height: 24px;
  line-height: 24px;
  font-size: 20px;
  padding-left: 20px;
  color: rgba(255,255,255,0.8);
`

const CounterPointer = props => (
  <CounterPointerStyled line={props.line}>
    <FontAwesomeIcon icon='caret-right' />
  </CounterPointerStyled>
)

export default CounterPointer
