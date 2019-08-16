import React from 'react'
import styled from 'styled-components'

const CodeEditorStyled = styled.textarea`
  border: none;
  background-color: #21252b;
  color: #ededef;
  width: calc(100% - 500px);
  height: 100%;
  margin: 0;
  padding: 50px;
  float: left;
  resize: none;
  font-size: 20px;
`

const CodeEditor = props => (
  <CodeEditorStyled
    className="codeFont"
    onKeyUp={(e) => props.setCode(e.target.value)}
    placeholder='Write AQA assembly here...'>
  </CodeEditorStyled>
)

export default CodeEditor
