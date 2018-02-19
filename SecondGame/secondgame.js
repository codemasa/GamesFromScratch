var canvas;
var canvasContext;

var score = 0;

var fps = 60;

var holdLeft = false;
var holdRight = false;
var holdSpace = false;

var shipX;
var shipY;
var shipV=0;

var missiles = 10;
var missilesA = []
class Missile {
  constructor(missileX, missileY, missileV) {
    this.missileX = missileX;
    this.missileY = missileY;
    this.missileV = -10;
    colorRect(this.missileX, this.missileY, 7, 7, 'green');
  }
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  shipX = canvas.width/2
  shipY = canvas.height-55
  setInterval(function() {
                drawStart()
                moveShip()
                shootMissile()
              }, 1000/fps);

  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);

}

function drawStart(){


  //canvas
  colorRect(0,0,canvas.width,canvas.height,'black');

  //ship
  colorTriangle(50,50,shipX,shipY,'white');

  //ammo
  canvasContext.font="15px Arial"
  canvasContext.fillText("Missiles: ",10,20);
  canvasContext.fillText(missiles, 100,20);
  canvasContext.fillText("Score",400,20);
  canvasContext.fillText(score, 400,35);

}

function moveShip() {
  if (holdLeft && shipX >= 50) {
    shipV = -5;
  }
  if (holdRight && shipX <= 450) {
    shipV = 5;
  }

  shipX += shipV;
  shipV = 0;

}

function shootMissile() {
  if (holdSpace) {
    var missile = createMissile();
    missile.missileY -= missileV;
  }

}

function createMissile(){
  var newMissile = new Missile(shipX - 4, 745);
  return newMissile;
}

function keyDown(evt){
  switch (evt.keyCode) {
    case 32:
      holdSpace = true;
      break;
    case 37:
      holdLeft = true;
      break;
    case 39:
      holdRight = true;
      break;
  }

}

function keyUp(evt){
  switch (evt.keyCode) {
    case 32:
      holdSpace = false;
      break;
    case 37:
      holdLeft = false;
      break;
    case 39:
      holdRight = false;
      break;
  }
}


function colorRect(leftX,topY, width,height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY, width,height);
}

function colorTriangle(height, base, x, y, color) {
  canvasContext.beginPath();
  canvasContext.moveTo(x,y);
  canvasContext.lineTo(x + base / 2, y + height);
  canvasContext.lineTo(x - base / 2, y + height);
  canvasContext.closePath();
  canvasContext.fillStyle = color;
  canvasContext.fill();
}
