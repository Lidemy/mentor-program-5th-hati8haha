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
  for (let i = 1; i <= Number(lines[0]); i++) {
    if (isPrime(Number(lines[i]))) {
      console.log('Prime')
    } else {
      console.log('Composite')
    }
  }
}

function isPrime(number) {
  if (number === 1) {
    return false
  }
  for (let i = 2; i < number / 2 + 1; i++) {
    if (number % i === 0) {
      return false
    }
  }
  return true
}
