import React from 'react'
import styled from 'styled-components'

const SyntaxHighlighterStyled = styled.div`
  width: calc(100% - 500px);
  height: 100%;
  padding: 50px;
  position: fixed;
  color: white;
  font-size: 20px;
  pointer-events: none;
  line-height: 24px;

  /* These colours are from Atom One Dark */
  & .keyword {
    color: hsl( 29, 54%, 61%);
  }
  & .register {
    color: hsl(187, 47%, 55%);
  }
  & .decimal {
    color: hsl(355, 65%, 65%);
  }
  & .label {
    color: hsl( 95, 38%, 62%);
  }
  & .labelArg {
    color: hsl( 95, 38%, 62%);
  }
  & .memoryRef {
    color: hsl(207, 82%, 66%);
  }

  & .syntaxError {
    background-color: hsl(  5, 48%, 51%);
  }
`

const SyntaxHighlighter = props => {
  return (
    <SyntaxHighlighterStyled className='codeFont'>
      {
        props.syntaxTree.map((sT, i) => {
          const key = `${i}${JSON.stringify(sT)}`

          if (sT.type === 'whitespace') return <div key={key} style={{ color: 'transparent' }}>whitespace</div>
          if (sT.type === 'syntax-error') {
            return <div key={key}><span className='syntaxError'>{sT.word}</span></div>
          }

          if (sT.type === 'label') {
            return <div key={key}><span className='label'>{sT.label}</span>:</div>
          }

          // Command
          const command = sT.parts[0].word
          const args = sT.parts.filter((x, i) => i !== 0)
          let jsx = [<span key={0} className='keyword'>{command} </span>]

          for (let i = 0; i < args.length; i++) {
            const arg = args[i]
            const last = i === args.length - 1

            jsx.push(<span key={i + 1}><span className={arg.type}>{arg.raw}</span>{last ? '' : ', '}</span>)
          }

          return <div key={key}>{jsx}</div>
        })
      }
    </SyntaxHighlighterStyled>
  )
}

export default SyntaxHighlighter
