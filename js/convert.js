const path = require('path');
const getColors = require('get-image-colors');

$('#uploadBtn').on('click', function(){
	var colorCodes = [];
	console.log($('#displayImg').attr('src'));
	let link = $('#displayImg').attr('src');

	getColors(link).then(colors => {
	  colors.map(currVal => {
	  	colorCodes.push(currVal._rgb);
	  })
	  grabCol(colorCodes);
	})
})

//console.log($('#container'))