// eslint-disable-next-line
function printFactor(n) {
  let i = 1
  while (i <= n) {
    if (n % i === 0) {
      console.log(i)
    }
    i++
  }
}
