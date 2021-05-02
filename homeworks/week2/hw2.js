// eslint-disable-next-line
function capitalize(str) {
  if (str === '') {
    return str
  } else {
    const inputToArr = str.split('')
    inputToArr[0] = inputToArr[0].toUpperCase()
    return inputToArr.join('')
  }
}
