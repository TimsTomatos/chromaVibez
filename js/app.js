
//grabs colors from image conversion
$(window).scroll(() => {
	$('#titleWrap').css('opacity', Math.max(1 - $(window).scrollTop() / 275, 0));
});

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [ h, s, l ];
}

var list = [
["red","Romance",[255,0,0,1]],
["pink","Love",[255,105,180,1]],
["orange","Energetic",[255,165,0,1]],
["yellow","Creativity",[255,255,0,1]],
["blue","Relax",[0,0,225,1]],
["green","Calm",[0,128,0,1]],
["purple","Royal",[128,0,128,1]],
["brown","Bold",[153,76,0,1]],
["black","Alternative",[0,0,0,1]],
["white","Upliftng",[255,255,255,1]]];

function newRound (data){
	console.log(data)
  var avg =[];
  var red=0;
  var green=0;
  var blue=0;
  data.map(rgb =>{
    red += rgb[0];
  });
  data.map(rgb =>{
    green += rgb[1];
  });
  data.map(rgb =>{
    blue += rgb[2];
  });
  avg.push(red/5);
  avg.push(green/5);
  avg.push(blue/5);
  /////
  var range =[];
  list.map(rgb => {
    range.push(Math.abs(rgbToHsl(...rgb[2])[0]-rgbToHsl(...avg)[0]));
  });
  return (range.indexOf(Math.min(...range)));
}

var rgbValues = [];
function grabCol(colors) {
	colors.map(currVal => {
		var singleRGB = [];
		singleRGB.push(currVal[0], currVal[1], currVal[2]);
		rgbValues.push(singleRGB);
		$('#container').append(`<div class="color" style="background-color:rgb(${currVal[0]}, ${currVal[1]}, ${currVal[2]})"></div>`);
		console.log(singleRGB)
		console.log(rgbValues)
	})
	console.log(list[newRound(rgbValues)]);
}

var loadFile = function(event) {
  var output = document.getElementById('displayImg');
  output.src = URL.createObjectURL(event.target.files[0]);
};

$('#uploadInp').on('click', function(){
	$('#uploadInp')[0].style.width = "300px";
	$('#uploadInp')[0].style.height = "200px";
})

// https://yev2rkvulj.execute-api.us-west-2.amazonaws.com/dev/get
$.ajax({
  url: "https://yev2rkvulj.execute-api.us-west-2.amazonaws.com/dev/get",
  method: 'GET',
  "Content-Type": "application/json",
})
.done((response) => {
	console.log(response)
})
.fail((err) => {
  console.log('error', err);
})





function addEmbed(link) {
	console.log(link)
}