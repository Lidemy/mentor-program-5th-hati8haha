function join(arr, concatStr) {
  if (arr.length === 0) {
    return ''
  } else {
    let output = String(arr[0])
    for (let i = 1; i < arr.length; i++) {
      output = output + concatStr + String(arr[i])
    }
    return output
  }
}

function repeat(str, times) {
  if (str === '') {
    return str
  } else {
    let output = ''
    for (let i = 0; i < times; i++) {
      output = output + str
    }
    return output
  }
}

console.log(join(['a'], '!'))
console.log(repeat('a', 5))
