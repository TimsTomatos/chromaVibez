const path = require('path');
const getColors = require('get-image-colors');

var colorCodes = [];
$('#uploadBtn').on('click', function(){
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