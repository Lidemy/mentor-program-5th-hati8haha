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
  const m = Number(lines[0])
  for (let i = 1; i <= m; i++) {
    const abk = lines[i].split(' ')
    const a = abk[0]
    const b = abk[1]
    const k = Number(abk[2])
    if (a === b) {
      console.log('DRAW')
    } else if (abCompare(a, b) === 'a>b') {
      if (k === 1) {
        console.log('A')
      } else {
        console.log('B')
      }
    } else {
      if (k === 1) {
        console.log('B')
      } else {
        console.log('A')
      }
    }
  }
}

function abCompare(a, b) {
  if (a.length > b.length) {
    return 'a>b'
  } else if (a.length < b.length) {
    return 'a<b'
  } else {
    let i = 0
    while (a[i] === b[i]) {
      i++
    }
    if (Number(a[i]) > Number(b[i])) {
      return 'a>b'
    } else {
      return 'a<b'
    }
  }
}
