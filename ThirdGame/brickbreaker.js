var canvas;
var canvasContext;

var ballX = 250;
var ballY = 400;
var ballVX = 0;
var ballVY = 5;

var counter = 0;
var score = 0
var checkpoints = 0;

var zeroCounter = 0;

var holdLeft = false;
var holdRight = false;
var holdShift = false;

var paddleXV = 0;


var paddleY = 790;
var paddleX = 200;

var PADDLE_THICKNESS = 10;
var PADDLE_WIDTH = 100;

var blocks = [[1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1],
              [1,1,1,1,1,1,1,1]];
var numBlocks = 40;
var BLOCK_WIDTH = (500/8);
var BLOCK_HEIGHT = 40;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var framesPerSecond = 60;


  setInterval(function() {
                drawEverything()
                movePaddle()
                ballMovement()}, 1000/framesPerSecond);


  document.addEventListener('keydown', keyDown)
  document.addEventListener('keyup', keyUp)

}


function drawEverything(){
  //canvas
  colorRect(0,0,canvas.width,canvas.height,'lightgrey');

  //ball
  colorCircle(ballX,ballY,10,'yellow');

  //paddle
  colorRect(paddleX,paddleY,PADDLE_WIDTH,PADDLE_THICKNESS,'green');

  //score
  canvasContext.font="15px Arial"
  canvasContext.fillText("Points",20,20);
  canvasContext.fillText(score, 20,35);
  canvasContext.fillText("Checkpoints",400,20);
  canvasContext.fillText(checkpoints, 400,35);

  //blocks
  for(var i=0 ; i<blocks.length ; i++){
    for(var j=0 ; j<blocks[i].length ; j++){
      if(blocks[i][j] == 1){
        colorRect((j*BLOCK_WIDTH)+10, (i*BLOCK_HEIGHT)+20+30, BLOCK_WIDTH-20, BLOCK_HEIGHT-20  , 'black')
      }
    }
  }

}
function movePaddle() {
  if(holdLeft && paddleX > 0) {
    if(holdShift){
      paddleXV = -10
    }
    else {
    paddleXV = -5
    }
  }
  if(holdRight && paddleX < 400) {
    if(holdShift){
      paddleXV = 10
    }
    else {
    paddleXV = 5
    }
  }
  paddleX += paddleXV;
  paddleXV = 0

}

function ballMovement() {
  if (ballX > 490 || ballX < 10) {
    ballVX = -ballVX;
  }
  if (ballY < 10) {
    ballVY = -(ballVY) + 1;
    counter++;
    if (counter == 25) {
      ballVY = 5;
      counter = 0;
      checkpoints ++
    }
  }
  if (ballY + 10 > paddleY && ballX > paddleX && ballX < (paddleX + 100)) {
    ballVY = -ballVY;
    if (holdRight) {
      ballVX += Math.floor(Math.random() * 5)
    }
    if (holdLeft) {
      ballVX += (-1) * Math.floor(Math.random() * 5)

    }
    if (ballVX == 0) {
      zeroCounter++;
      if (zeroCounter == 3) {
        ballVX = 1 + Math.floor(Math.random() * 5);
        zeroCounter = 0;
      }
    }

  }
  if (ballX < paddleX || ballX > (paddleX + 100)) {
    if (ballY > 800) {
      console.log('game over')
      resetGame();
    }
  }

  for(var i=0 ; i<blocks.length ; i++){
    for(var j=0 ; j<blocks[i].length ; j++){
      if(blocks[i][j] == 1){
        if(ballX >= (j*BLOCK_WIDTH)+10 && ballX <= (j*BLOCK_WIDTH)+10+BLOCK_WIDTH-20 && ballY >= (i*BLOCK_HEIGHT)+20+30+40 && ballY <= (i*BLOCK_HEIGHT)+20+30+40+ BLOCK_HEIGHT-20){
          ballVY = -(ballVY) + 1;
          blocks[i][j] = 0
          score++
          numBlocks--
        }
      }
    }
    if(numBlocks == 0){
      canvasContext.fillText("You Win",220,400);
    }
  }
  ballX += ballVX;
  ballY += ballVY
}

function keyDown(evt) {

  switch (evt.keyCode) {
    case 37:
      holdLeft = true;
      break;
    case 39:
      holdRight = true;
      break;
    case 16:
      holdShift = true;
      break;

  }
}
function keyUp(evt) {
  switch (evt.keyCode) {
    case 37:
      holdLeft = false;
      break;
    case 39:
      holdRight = false;
      break;
    case 16:
      holdShift = false;
      break

  }
}
function resetGame() {
  ballX = 250;
  ballY = 400;
  ballVX = 0;
  ballVY = 5;
  counter = 0;
  score = 0;
  checkpoints = 0;
}

function colorRect(leftX,topY, width,height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY, width,height);
}

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2,true);
	canvasContext.fill();
}
