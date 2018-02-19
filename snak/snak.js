var canvas;
var canvasContext;

var fps = 60;

var snakeX = 0;
var snakeY = 0;
var snakeXV = 20;
var snakeYV = 0;

var snakeTail = [];
var tailLength = 5;

var holdLeft = false;
var holdRight = false;
var holdUp = false;
var holdDown = false;

var max = (500/20)
var appleX = 20 * Math.floor(Math.random() * max);
var appleY = 20 * Math.floor(Math.random() * max);
var apple;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  setInterval(function() {
                drawStart()
                moveSnake()
              }, 10000/200);

  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);

}

function drawStart(){
  //canvas
  colorRect(0,0,canvas.width,canvas.height,'black');

  //snake
  for(var i=0 ; i<snakeTail.length ; i++) {
    colorRect(snakeTail[i].x, snakeTail[i].y,20,20,'white');
    if(snakeTail[i].x == snakeX && snakeTail[i].y == snakeY) {
      tailLength = 5;
    }
  }
  snakeTail.push({x: snakeX, y: snakeY});
  while(snakeTail.length>tailLength) {
    snakeTail.shift();
  }
  if (snakeX == appleX && snakeY == appleY){
    tailLength++
    appleX = 20 * Math.floor(Math.random() * max);
    appleY = 20 * Math.floor(Math.random() * max);
  }
  //apple
  apple = colorRect(appleX, appleY, 20, 20, 'white');
}

function moveSnake() {
  snakeX += snakeXV;
  snakeY += snakeYV;
  if (snakeX >= 500 || snakeX < 0 || snakeY >= 500 || snakeY < 0) {
    gameOver();
  }
  for(var i=0 ; i<snakeTail.length ; i++){
    if(snakeX == snakeTail[i].x && snakeY == snakeTail[i].y ) {
      gameOver();
    }
  }

  if (holdLeft) {
    if(snakeXV != 20){
      snakeXV = -20;
      snakeYV = 0;
    }
  }
  if (holdRight) {
    if(snakeXV != -20){
      snakeXV = 20;
      snakeYV = 0;
    }
  }
  if (holdUp) {
    if(snakeYV != 20){
      snakeXV = 0;
      snakeYV = -20;
    }
  }
  if (holdDown) {
    if(snakeYV != -20){
      snakeXV = 0;
      snakeYV = 20;
    }
  }



}


function keyDown(evt){
  switch (evt.keyCode) {
    case 37:
      holdLeft = true;
      break;
    case 38:
      holdUp = true;
      break;
    case 39:
      holdRight = true;
      break;
    case 40:
      holdDown = true;
      break;
  }
}


function keyUp(evt){
  switch (evt.keyCode) {
    case 37:
      holdLeft = false;
      break;
    case 38:
      holdUp = false;
      break;
    case 39:
      holdRight = false;
      break;
    case 40:
      holdDown = false;
      break;
  }
}

function gameOver() {
  canvasContext.font="50px Arial"
  canvasContext.fillText('Game Over', 125,200);
  location.reload();
}

function colorRect(leftX,topY, width,height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY, width,height);
}
