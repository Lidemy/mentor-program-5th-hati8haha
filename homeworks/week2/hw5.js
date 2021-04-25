function join(arr, concatStr) {
	var output = String(arr[0])
	for (i = 1; i<arr.length; i++) {
		output = output + concatStr + String(arr[i])
	}
	return output
}

function repeat(str, times) {
	var output = ''
	for (i = 0; i < times; i++) {
		output = output + str
	}
	return output
  
}

console.log(join(['a',1,'b',2,'c',3], ','));
console.log(repeat('yoyo', 2));