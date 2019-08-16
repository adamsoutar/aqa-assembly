import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MemoryList from './MemoryList'

const CPUVisualiserContainer = styled.div`
  width: 500px;
  height: 100%;
  background-color: #282c34;
  float: right;
  position: relative;
  color: white;
`
const RunBar = styled.div`
  position: absolute;
  bottom: 0;
  height: 70px;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`
const RunBarButton = styled.button`
  border: none;
  background: #22252c;
  border-radius: 5px;
  height: 100%;
  width: calc(25% - 10px);
  padding: 10px;
  color: white;
`
const MemoryHeaderStyled = styled.div`
  padding: 10px;
  padding-left: 15px;
  margin-top: 10px;
`

const MemoryHeader = props => (
  <MemoryHeaderStyled>
    <FontAwesomeIcon icon={props.icon} style={{ marginRight: 15 }}/>
    {props.children}
  </MemoryHeaderStyled>
)

const CPUVisualiser = props => (
  <CPUVisualiserContainer>
    <MemoryHeader icon='microchip'>Registers</MemoryHeader>
    <MemoryList items={props.registers} />

    <MemoryHeader icon='memory'>Memory</MemoryHeader>
    <MemoryList items={props.memory} />

    <RunBar>
      <RunBarButton onClick={props.run}>Run</RunBarButton>
      <RunBarButton />
      <RunBarButton />
      <RunBarButton />
    </RunBar>
  </CPUVisualiserContainer>
)

export default CPUVisualiser
