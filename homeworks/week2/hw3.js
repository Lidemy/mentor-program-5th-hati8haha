function reverse(str) {
	var temp = []
	for (var i = str.length -1; i >= 0; i--) {
		temp.push(str[i])
	}
	output = temp.join('')
	console.log(output)
}

reverse('hello');
