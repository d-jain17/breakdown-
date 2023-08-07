const grid=document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockwidth = 100
const blockheight= 20
const ballDiameter = 20
const boardWidth = 560
const boardheight = 300
let xDirection=-2
let yDirection=2
const userStart =[230,10]
let currentPosition = userStart
const ballStart = [270,40]
let ballCurrentPosition = ballStart
let timerID
let score =0
class Block {
    /*class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
}
The example above creates a class named "Car".

The class has two initial properties: "name" and "year".*/

constructor(xAxis, yAxis){
    this.bottomLeft = [xAxis,yAxis]
    this.bottomRight = [xAxis+blockwidth,yAxis]
    this.topLeft = [xAxis,yAxis+blockheight]
    this.topRight = [xAxis+blockwidth,yAxis+blockheight]
}
}

const blocks= [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),

    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
   

]


function addBlocks(){
for(let i = 0;i<blocks.length;i++){
const block = document.createElement('div')
block.classList.add('block')
block.style.left = blocks[i].bottomLeft[0] + 'px'
block.style.bottom = blocks[i].bottomLeft[1]+'px'
grid.appendChild(block) //The appendChild() method appends a node (element) as the last child of an element.
console.log(blocks[i].bottomLeft)
}

}
addBlocks()
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

function moveUser(e) {
  switch(e.key){ //The switch statement is used to perform different actions based on different conditions.
  //Object.keys() function is used to return an array whose elements are strings corresponding to 
  //the enumerable properties found directly upon an object.
  case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10
        console.log(currentPosition[0] > 0)
        drawUser()   
      }
      break
  case 'ArrowRight':
          if (currentPosition[0] < (boardWidth - blockwidth)) {
            currentPosition[0] += 10
            console.log(currentPosition[0])
            drawUser()   
          }
          break
  }
}
document.addEventListener('keydown', moveUser)
function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom=currentPosition[1] + 'px'
}

function drawBall(){
  ball.style.left = ballCurrentPosition[0]+'px'
  ball.style.bottom= ballCurrentPosition[1]+'px'

}

function moveBall(){
  ballCurrentPosition[0] += xDirection
  ballCurrentPosition[1] += yDirection
  drawBall()
  checkForCollisions()
}
timerID= setInterval(moveBall,20)
function checkForCollisions(){
  for(let i=0; i<blocks.length;i++){
    if(
      (ballCurrentPosition[0]> blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballCurrentPosition[1] + ballDiameter)> blocks[i].bottomLeft[1]&& ballCurrentPosition[1] <blocks[i].topLeft[1])
    ){
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i,1) //The splice() method adds and/or removes array elements.
      // syntax=array.splice(index, howmany, item1, ....., itemX)
      changeDirection()
      score++
      scoreDisplay.innerHTML=score

      if(blocks.length ==0){
        scoreDisplay.innerHTML = 'you win'
        clearInterval(timerID)
        document.removeEventListener('keydown', moveUser)
      }
    }

  }
  if(ballCurrentPosition[0]>=(boardWidth - ballDiameter) || 
  ballCurrentPosition[1]>= (boardheight-ballDiameter) ||
  ballCurrentPosition[0] <= 0){
    changeDirection()
  }

  if((ballCurrentPosition[0]> currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockwidth) &&
   (ballCurrentPosition[1]> currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockheight) ){
    changeDirection()
   }
  if(ballCurrentPosition[1]<=0){
    clearInterval(timerID)
    scoreDisplay.innerHTML = 'You lose'
    document.removeEventListener('keydown', moveUser)
  }
}
function changeDirection(){
    if(xDirection === 2 && yDirection ===2){
      yDirection=-2
      return
    }
    if(xDirection === 2 && yDirection === -2){
      xDirection = -2;
      return 
    }
    if(xDirection === -2 && yDirection === -2){
      yDirection = 2
      return
    }
    if(xDirection === -2 && yDirection === 2){
      xDirection = 2
      return
    }
}
