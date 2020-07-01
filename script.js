//Analog and Digital Clocks
setInterval(drawClock, 1000); 
digitalClock();  

//Constants
var borderWidthRatio = 0.1, innerCircleRatio = 0.1;
var borderInnerRadiusRatio = 0.95;
var borderOuterRadiusRatio = 1.05;
var NUM_ON_CLOCK = 12;
var fontSizeRatio = 0.15;
var numDistanceRatio = 0.85;

//Creates canvas for analog clock
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;

//Drawing the Clock
function drawClock() {
  drawFace (ctx, radius);
  drawNumbers (ctx, radius);
  drawTime (ctx, radius);
}
//Draws clocks face
function drawFace(ctx, radius) {
  //Draw's the white circle background
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  
  // Create's clock's outer grey border
  var grad = ctx.createRadialGradient(0, 0, radius * borderInnerRadiusRatio, 0, 0, radius * borderOuterRadiusRatio);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * borderWidthRatio;
  ctx.stroke();
  
  //Create's inner circle 
  ctx.beginPath();
  ctx.arc(0, 0, radius * innerCircleRatio, 0 , 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

// Drawing the clock's numbers all horizontal
function drawNumbers(ctx, radius) {
  ctx.font = radius * fontSizeRatio + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for(var num = 1; num <= NUM_ON_CLOCK; num++){
    var ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * numDistanceRatio);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * numDistanceRatio);
    ctx.rotate(-ang);
  } 
}

// Get's the time and then draws hands 
function drawTime(ctx, radius){
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  hour = hour%12;
  hour = hourPosition(hour, minute,second);
  minute = minutePosition(minute, second);
  second = secondPosition(second);

  drawHand(ctx, hour, radius*0.5, radius*0.07);
  drawHand(ctx, minute, radius*0.8, radius*0.07);
  drawHand(ctx, second, radius*0.9, radius*0.02);
}

//Hour hand position
function hourPosition(hours, minutes, seconds){
  return (hours*Math.PI/6)+(minutes*Math.PI/(6*60))+(seconds*Math.PI/(360*60))
}
//Minute hand position
function minutePosition(minutes, seconds){
  return (minutes*Math.PI/30)+(seconds*Math.PI/(30*60))
}
//Second hand position
function secondPosition(seconds) {
  return (seconds*Math.PI/30)
}

//Draws clocks hands
function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

//Grabs the current time for digital clock
function digitalClock() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  document.getElementById("clock").innerText = hour + " : " + min + " : " + sec; /* adding time to the div */
  var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
}
//Runs clock and updates time
function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

//Toggling image depending on what clock is showing
$(document).ready(function(){
  $("button").click(function() {
    $('.clockType').toggleClass("active");
    $('#canvas').toggle();
    $('.clockSection').toggle();
  });  
});