const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  const str = lines[0]
  const len = str.length
  let reverseStr = ''
  for (let i = len - 1; i >= 0; i--) {
    reverseStr += str[i]
  }
  if (str === reverseStr) {
    console.log('True')
  } else {
    console.log('False')
  }
}
