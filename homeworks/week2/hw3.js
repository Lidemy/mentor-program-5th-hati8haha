// eslint-disable-next-line
function reverse(str) {
  const temp = []
  for (let i = str.length - 1; i >= 0; i--) {
    temp.push(str[i])
  }
  const output = temp.join('')
  console.log(output)
}
