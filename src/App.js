import React, { Fragment, Component } from 'react'
import CodeEditor from './Components/CodeEditor'
import CPUVisualiser from './Components/CPUVisualiser'
import { } from './Lib/icons'
import parseSyntax from './Lib/syntaxParser'
import SyntaxHighlighter from './Components/SyntaxHighliter'

const REGISTER_COUNT = 12
const comparers = {
  'BEQ': '===',
  'BNE': '!==',
  'BGT': '>',
  'BLT': '<'
}

class App extends Component {
  constructor (props) {
    super(props)

    const cpuState = this.getInitialCPUState()

    this.state = {
      code: '',
      syntaxTree: [],
      ...cpuState
    }

    // Keep a non-state refrence so we can edit them quickly
    this.memory = cpuState.memory
    this.registers = cpuState.registers
    this.programCounter = cpuState.programCounter
    this.labels = {}
    this.comparison = {
      num1: 0,
      num2: 0
    }
  }

  getInitialCPUState () {
    let registers = {}

    for (let i = 0; i < REGISTER_COUNT; i++) {
      registers[i] = 0
    }

    return {
      memory: {},
      registers,
      programCounter: 0
    }
  }

  newCPUState () {
    // Used for render
    this.setState({
      programCounter: this.programCounter,
      registers: this.registers,
      memory: this.memory
    })
  }

  run () {
    this.programCounter = 0
    this.nextLine()
  }

  nextLine () {
    setTimeout(() => {
      this.executeLine()

      this.programCounter++
      this.newCPUState()

      if (this.programCounter < this.state.syntaxTree.length) {
        this.nextLine()
      }
    }, 0)
  }

  getValue (operand2) {
    return operand2.type === 'decimal'
      ? operand2.number
      : this.registers[operand2.number]
  }

  executeLine () {
    const line = this.state.syntaxTree[this.programCounter]

    if (line.type === 'label') {
      this.labels[line.label] = this.programCounter
      return
    }

    if (line.type === 'whitespace') return
    if (line.type === 'syntax-error') return

    // Command

    /* ~Shudder~ This code is horrible. */

    const command = line.parts[0].word
    // This switch case doesn't need a default because if
    // a keyword is not recognised that is a syntax error
    // eslint-disable-next-line
    switch (command) {
      case 'LDR':
        this.registers[line.parts[1].number] = this.memory[line.parts[2].number]
        break
      case 'STR':
        this.memory[line.parts[2].number] = this.registers[line.parts[1].number]
        break
      case 'ADD':
        this.registers[line.parts[1].number] = this.registers[line.parts[2].number] + this.getValue(line.parts[3])
        break
      case 'SUB':
        this.registers[line.parts[1].number] = this.registers[line.parts[2].number] - this.getValue(line.parts[3])
        break
      case 'MOV':
        this.registers[line.parts[1].number] = this.getValue(line.parts[2])
        break
      case 'CMP':
        this.comparison = {
          num1: this.registers[line.parts[1].number],
          num2: this.getValue(line.parts[2])
        }
        break
      case 'B':
        this.programCounter = this.labels[line.parts[1].label]
        break
      case 'BEQ':
      case 'BNE':
      case 'BGT':
      case 'BLT':
        const bool = `${this.comparison.num1} ${comparers[command]} ${this.comparison.num2}`
        // eslint-disable-next-line
        if (eval(bool)) {
          this.programCounter = this.labels[line.parts[1].label]
        }
        break
      case 'AND':
        this.registers[line.parts[1].number] = this.registers[line.parts[2].number] & this.getValue(line.parts[3])
        break
      case 'ORR':
        this.registers[line.parts[1].number] = this.registers[line.parts[2].number] | this.getValue(line.parts[3])
        break
      case 'EOR':
        this.registers[line.parts[1].number] = this.registers[line.parts[2].number] ^ this.getValue(line.parts[3])
        break
      case 'MVN':
        this.registers[line.parts[1].number] = ~ this.getValue(line.parts[2])
        break
      case 'LSL':
        this.registers[line.parts[1].number] = this.registers[line.parts[2].number] << this.getValue(line.parts[3])
        break
      case 'LSR':
        this.registers[line.parts[1].number] = this.registers[line.parts[2].number] >> this.getValue(line.parts[3])
        break
      case 'HALT':
        this.programCounter = this.state.syntaxTree.length
        break
    }
  }

  setCode (code) {
    let syntaxTree = parseSyntax(code) || []

    this.setState({
      code,
      syntaxTree
    })
  }

  render () {
    return (
      <Fragment>
        <SyntaxHighlighter syntaxTree={this.state.syntaxTree} />
        <CodeEditor setCode={this.setCode.bind(this)}></CodeEditor>
        <CPUVisualiser {...this.state} run={this.run.bind(this)} />
      </Fragment>
    )
  }
}

export default App
