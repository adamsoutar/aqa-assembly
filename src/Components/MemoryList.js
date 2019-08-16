import React from 'react'
import styled from 'styled-components'

const MemoryListStyled = styled.div`
  height: 250px;
  background: rgba(0,0,0,0.1);
  overflow-y: auto;
`
const MemoryItemStyled = styled.div`
  height: 35px;
  line-height: 25px;
  padding: 5px;
  text-align: center;

  &:nth-child(even) {
    background: rgba(0,0,0,0.05);
  }
`
const Index = styled.div`
  float: left;
  opacity: 0.6;
  margin-left: 20px;
`
const Value = styled.div`
  float: right;
  margin-right: 20px;
`

const MemoryList = props => (
  <MemoryListStyled>
    {
      Object.keys(props.items).length === 0
      ? <MemoryItemStyled style={{ color: 'rgba(255,255,255,0.3)' }}>
          Memory appears as you write to it.
        </MemoryItemStyled>
      : null
    }

    {
      Object.keys(props.items).map((key) => (
        <MemoryItemStyled key={key}>
          <Index>{key}</Index>
          <Value>{props.items[key]}</Value>
        </MemoryItemStyled>
      ))
    }
  </MemoryListStyled>
)

export default MemoryList
