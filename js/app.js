
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
  ["hayashi", "Metallica", [133.4, 108.6, 108.2,1]],
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
  $('#generatedCont')[0].style.display = "block";
  $('#sketchJS').empty(); //stops bubble animation (sketch.js)
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





//sketch.js
//credit to: https://github.com/soulwire/sketch.js
function Particle( x, y, radius ) {
  this.init( x, y, radius );
}

Particle.prototype = {

  init: function( x, y, radius ) {

    this.alive = true;

    this.radius = radius || 10;
    this.wander = 0.15;
    this.theta = random( TWO_PI );
    this.drag = 0.92;
    this.color = '#fff';

    this.x = x || 0.0;
    this.y = y || 0.0;

    this.vx = 0.0;
    this.vy = 0.0;
  },

  move: function() {

    this.x += this.vx;
    this.y += this.vy;

    this.vx *= this.drag;
    this.vy *= this.drag;

    this.theta += random( -0.5, 0.5 ) * this.wander;
    this.vx += sin( this.theta ) * 0.1;
    this.vy += cos( this.theta ) * 0.1;

    this.radius *= 0.96;
    this.alive = this.radius > 0.5;
  },

  draw: function( ctx ) {

    ctx.beginPath();
    ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

// ----------------------------------------
// Example
// ----------------------------------------

var MAX_PARTICLES = 280;
var COLOURS = [ '#78C5C9', 'lightgray', '#172B3F', '#D7A125', 'darkgray', '#FF4E50', '#F9D423' ];

var particles = [];
var pool = [];

var demo = Sketch.create({
  container: document.getElementById( 'sketchJS' )
});

demo.setup = function() {

  // Set off some initial particles.
  var i, x, y;

  for ( i = 0; i < 20; i++ ) {
    x = ( demo.width * 0.5 ) + random( -100, 100 );
    y = ( demo.height * 0.5 ) + random( -100, 100 );
    demo.spawn( x, y );
  }
};

demo.spawn = function( x, y ) {

  if ( particles.length >= MAX_PARTICLES )
    pool.push( particles.shift() );

  particle = pool.length ? pool.pop() : new Particle();
  particle.init( x, y, random( 5, 40 ) );

  particle.wander = random( 0.5, 2.0 );
  particle.color = random( COLOURS );
  particle.drag = random( 0.9, 0.99 );

  theta = random( TWO_PI );
  force = random( 2, 8 );

  particle.vx = sin( theta ) * force;
  particle.vy = cos( theta ) * force;

  particles.push( particle );
}

demo.update = function() {

  var i, particle;

  for ( i = particles.length - 1; i >= 0; i-- ) {

    particle = particles[i];

    if ( particle.alive ) particle.move();
    else pool.push( particles.splice( i, 1 )[0] );
  }
};

demo.draw = function() {

  demo.globalCompositeOperation  = 'lighter';
  
  for ( var i = particles.length - 1; i >= 0; i-- ) {
    particles[i].draw( demo );
  }
};

demo.mousemove = function() {

  var particle, theta, force, touch, max, i, j, n;

  for ( i = 0, n = demo.touches.length; i < n; i++ ) {

    touch = demo.touches[i], max = random( 1, 4 );
    for ( j = 0; j < max; j++ ) demo.spawn( touch.x, touch.y );
  }
};

