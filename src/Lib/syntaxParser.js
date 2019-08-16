const knownKeywords = [
  'LDR', 'STR', 'ADD', 'SUB', 'MOV', 'CMP', 'B', 'BEQ', 'BGT', 'BNE', 'BLT',
  'AND', 'ORR', 'EOR', 'MVN', 'LSL', 'LSR', 'HALT'
]

function parseSyntax (code) {
  let lines = []

  // Split by newline
  for (const line of code.split(/\r?\n/)) {
    if (line.trim() === '') continue

    const parts = line.trim().split(' ')
    const keyword = parts[0]

    if (keyword[keyword.length - 1] === ':') {
      // Label
      lines.push({
        type: 'label',
        label: keyword.substring(0, keyword.length - 1)
      })
      continue
    }

    if (!knownKeywords.includes(keyword)) {
      lines.push({
        type: 'syntax-error',
        word: keyword
      })
      continue
    }

    let newParts = [
      {
        type: 'keyword',
        word: keyword
      }
    ]
    for (let i = 1; i < parts.length; i++) {
      let part = parts[i]
      if (part[part.length - 1] === ',') {
        part = part.substring(0, part.length - 1)
      }

      if (part[0] === 'R') {
        newParts.push({
          type: 'register',
          number: parseInt(part.substring(1), 10)
        })
      } else if (part[0] === '#') {
        newParts.push({
          type: 'decimal',
          number: parseInt(part.substring(1), 10)
        })
      } else {
        if (newParts[0].word[0] === 'B') {
          newParts.push({
            type: 'label',
            label: part
          })
          continue
        }
        newParts.push({
          type: 'memory-ref',
          number: parseInt(part, 10)
        })
      }
    }

    lines.push({
      type: 'command',
      parts: newParts
    })
  }

  return lines
}

export default parseSyntax
