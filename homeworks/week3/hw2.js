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
  const input = lines[0].split(' ')
  const n = Number(input[0])
  const m = Number(input[1])
  for (let i = n; i <= m; i++) {
    if (isNarcissistic(i)) {
      console.log(i)
    }
  }
}

function isNarcissistic(number) {
  const tempArr = digits(number).digNumber.map((x) => x ** digits(number).dig)
  let checkNumber = 0
  for (let i = 0; i < tempArr.length; i++) {
    checkNumber += tempArr[i]
  }
  if (checkNumber === number) {
    return true
  } else {
    return false
  }
}

function digits(number) {
  let digit = 0
  const arr = []
  while (number !== 0) {
    arr.push(Math.floor(number % 10))
    digit++
    number = Math.floor(number / 10)
  }
  return {
    dig: digit,
    digNumber: arr
  }
}
