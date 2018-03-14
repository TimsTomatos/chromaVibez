
$(window).scroll(() => { //fades title on scroll
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
  //["hayashi", "Metallica", [132, 108, 108]],
  ["pink","Love",[255,105,180,1]],
  ["orange","Energetic",[255,165,0,1]],
  ["yellow","Creativity",[255,255,0,1]],
  ["blue","Relax",[0,0,225,1]],
  ["green","Calm",[0,128,0,1]],
  ["purple","Royal",[128,0,128,1]],
  ["brown","Bold",[153,76,0,1]],
  ["black","Alternative",[0,0,0,1]],
  ["white","Upliftng",[255,255,255,1]],
];

function newRound (data){
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
  //console.log(avg)
  /////
  var range =[];
  list.map(rgb => {
    range.push(Math.abs(rgbToHsl(...rgb[2])[0]-rgbToHsl(...avg)[0]));
  });

  return (range.indexOf(Math.min(...range)));
}

function grabCol(colors) { //grabs colors from image conversion
  var rgbValues = [];
  $('#generatedCont').empty();

  var delayIncrement = 0
  colors.map(currVal => {
    delayIncrement += 250;
    var singleRGB = [];
    rgbValues.push([currVal[0], currVal[1], currVal[2]]);
    $(`<div class="color" style="background: linear-gradient(to bottom, rgb(255,255,255) 0%, rgb(${currVal[0]}, ${currVal[1]}, ${currVal[2]}) 70%)"></div>`).hide().appendTo('#generatedCont').delay(delayIncrement).slideDown(350);
    //$('#container').append(`<div class="color" style="background: linear-gradient(to bottom, rgb(255,255,255) 0%, rgb(${currVal[0]}, ${currVal[1]}, ${currVal[2]}) 70%)"></div>`);
  })

  //console.log(list[newRound(rgbValues)])
  //console.log(list[newRound(rgbValues)][1]);
  $.ajax({
    url: "https://dwcvlik50c.execute-api.us-west-2.amazonaws.com/dev/post",
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: 'JSON',
    data: JSON.stringify(list[newRound(rgbValues)][1])
  })
  .done((response) => {
    console.log(response)
  })
  .fail((err) => {
    //console.log(err.responseText);

    $('#generatedCont').append(`
      <div id="playImgWrap">
        <iframe id="playImg" src="${err.responseText}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
    `)
  })
}

//makes dynamic element the same height and width

let $img = $('#playImg');
$(window).resize(function () {
	$img.height($img.width());
}).resize();


//converts img

function convertor() {
	console.log($('#displayImg').attr('src'))
}

var loadFile = function(event) {
  var output = document.getElementById('displayImg');
  output.src = URL.createObjectURL(event.target.files[0]);
};

$('#uploadInp').on('click', function(){
	
})
