function capitalize(str) {
	var inputToArr = str.split('')
	inputToArr[0] = inputToArr[0].toUpperCase()
	output = inputToArr.join('')
	return output
}

console.log(capitalize('hello'));
