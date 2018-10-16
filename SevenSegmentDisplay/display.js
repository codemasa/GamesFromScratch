var canvas;
var context;


window.onload = function() {
  canvas = document.getElementById("display");
  context = canvas.getContext("2d");
  colorBackground(0,0,canvas.width, canvas.height, "black");
  setInterval(function(){
    i=0
    colorDigit(0,5)
    i = i+1 % 9

  }, 1000/60)

}
function colorBackground(leftX,topY, width,height, color) {
	context.fillStyle = color;
	context.fillRect(leftX,topY, width,height);
}
function colorRect(leftX,topY, width,height, color) {
	context.fillStyle = color;
	context.fillRect(leftX,topY, width,height);
}

function colorCircle(centerX, centerY, radius, color) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(centerX, centerY, radius, 0,Math.PI*2,true);
	context.fill();
}

function colorSegment(type, digit, on){
  const canvasWidth = 1000;
  const canvasHeight = 225;
  const height = 25;
  const width = 75;
  var color = "#000000";
  if(on == true){
    color = "#FF0000";
  }
  switch(type) {
    case "A":
      colorRect(25+(digit*width*2), 0, width, height,color);
      break;
    case "B":
      colorRect((width+25)+(digit*width*2), 25 , height, width, color);
      break;
    case "C":
      colorRect((width+25)+(digit*width*2), width+50 , height, width, color);
      break;
    case "D":
      colorRect(25+(digit*width*2), (width+25)*2 , width, height, color);
      break;
    case "E":
      colorRect((digit*width*2), 25 , height, width, color);
      break;
    case "F":
      colorRect((digit*width*2), width+50 , height, width, color);
      break
    case "G":
      colorRect(25+(digit*width*2), width+25, width, height, color);
      break;
    case "DP":
      colorCircle((63+width)+(digit*width*2), (width+25)*2 + 13, height/3, color);
  }

}

function colorDigit(digit, value){
  var numbers = [0x7E	, 0x30, 0x6D, 0x79, 0x33, 0x5B, 0x5F, 0x70, 0x7F, 0x7B];
  var segments = ["A", "B", "C", "D", "E", "F", "G"]
  colorSegment(segments[0], digit, isOn(numbers[value], 6));
  colorSegment(segments[1], digit, isOn(numbers[value], 5));
  colorSegment(segments[2], digit, isOn(numbers[value], 4));
  colorSegment(segments[3], digit, isOn(numbers[value], 3));
  colorSegment(segments[4], digit, isOn(numbers[value], 2));
  colorSegment(segments[5], digit, isOn(numbers[value], 1));
  colorSegment(segments[6], digit, isOn(numbers[value], 0));
}

function isOn(val, shift){
  if(((val >> shift) & 1)){
    return true;
  }
  return false;

}
