// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var para = document.querySelector('p');
var count = 0;

// script gets a reference to the <canvas> element, then calls the getContext() 
// method on it to give us a context on which we can start to draw. 
// The resulting variable (ctx) is the object that directly represents the drawing area 
// of the canvas and allows us to draw 2D shapes on it.

//The width and height of the canvas
//to equal the width and height of the browser viewport (the area that the webpage appears on 
//— this can be got from the Window.innerWidth and Window.innerHeight properties).

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// Function to generate random number
//This function takes two numbers as arguments, and returns a random number in the range between the two.
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//Constructor
// function Ball() {
//   this.x = random(0, width); //x coordinates
//   this.y = random(0, height); //y coordinates
//   this.velX = random(-7, 7); //Horizontal velocity
//   this.velY = random(-7, 7); //Vertical velocity
//   this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
//   this.size = random(10, 20);
// }

function Shape() {
  this.x = random(0, width); //x coordinates
  this.y = random(0, height); //y coordinates
  this.velX = random(-7, 7); //Horizontal velocity
  this.velY = random(-7, 7); //Vertical velocity
  this.exist = true;
}
// define Ball constructor, inheriting from Shape
function Ball(x,y,velX,velY,exist){
  Shape.call(this, x,y,velX,velY,exist);

  this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
  this.size = random(10, 20);
}

  Ball.prototype = Object.create(Shape.prototype);
  Ball.prototype.constructor = Ball;



// x and y coordinates — each ball is initially given a random horizontal and vertical coordinate where 
// it will start on the screen. This can range between 0 (top left hand corner) to the width and height 
// of the browser viewport (bottom right hand corner).


// horizontal and vertical velocity (velX and velY) — each ball is given random values to represent its 
// velocity; in real terms these values will be regularly added to the x/y coordinate values when we start 
// to animate the balls, to move them by this much on each frame.

// color — each ball gets a random color to start with.
// size — each ball gets a random size, a radius of between 10 and 20 pixels.


Ball.prototype.draw = function() {
  ctx.beginPath(); //want to draw a shape on the canvas
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

// Using this function, we can tell our ball to draw itself onto the screen, 
// by calling a series of members of the 2D canvas context we defined earlier (ctx). 
// The context is like the paper, and now we want to command our pen to draw something on it:


// First, we use beginPath() to state that we want to draw a shape on the paper.


// Next, we use fillStyle to define what color we want the shape to be — we set it to our ball's color property.

// Next, we use the arc() method to trace an arc shape on the paper. Its parameters are:


// The x and y position of the arc's center — we are specifying our ball's x and y properties.
// The radius of our arc — we are specifying our ball's size property.
// The last two parameters specify the start and end number of degrees round the circle that the arc 
// is drawn between. Here we specify 0 degrees, and 2 * PI, which is the equivalent of 360 degrees 
// in radians (annoyingly, you have to specify this in radians). That gives us a complete circle. 
// If you had specified only 1 * PI, you'd get a semi-circle (180 degrees).


// Last of all, we use the fill() method, which basically states "finish drawing the path we started with 
// beginPath(), and fill the area it takes up with the color we specified earlier in fillStyle."


// Updating the ball's data

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) { //checks if the balls are not the same
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

// The first four parts of the function check whether the ball has reached the edge of the canvas. 
// If it has, we reverse the polarity of the relevant velocity to make the ball travel in the
// opposite direction. So for example, if the ball was traveling upwards (positive velY), 
// then the vertical velocity is changed so that it starts to travel downwards instead (negative velY).

// 1 Checking to see whether the x coordinate is greater than the width of the canvas 
// (the ball is going off the right hand edge).

// 2 Checking to see whether the x coordinate is smaller than 0 (the ball is going off the left hand edge).

// 3 Checking to see whether the y coordinate is greater than the height of the canvas 
// (the ball is going off the bottom edge).

// 4 Checking to see whether the y coordinate is smaller than 0 (the ball is going off the top edge).


function EvilCircle(x,y,exist){
  Shape.call(this, x,y,exist);

    this.color = 'white';
    this.size  = 10;
    this.velX  = 20;
    this.velY  = 20; 

  }

  EvilCircle.prototype = Object(Shape.prototype);
  EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function(){
  ctx.beginPath(); //want to draw a shape on the canvas
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();

}
// define EvilCircle checkBounds method

EvilCircle.prototype.checkBounds = function() {
  if((this.x + this.size) >= width) {
    this.x -= this.size;
  }

  if((this.x - this.size) <= 0) {
    this.x += this.size;
  }

  if((this.y + this.size) >= height) {
    this.y -= this.size;
  }

  if((this.y - this.size) <= 0) {
    this.y += this.size;
  }
};

// define EvilCircle setControls method

EvilCircle.prototype.setControls = function(){
  var _this = this;//to store the current value
window.onkeydown = function(e) {
    if (e.keyCode === 65) { //KeyA
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) { //KeyD
      _this.x += _this.velX;
    } else if (e.keyCode === 87) { //KeyW
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) { //KeyS
      _this.y += _this.velY;
    }
  }
}

// define EvilCircle collision detection
EvilCircle.prototype.collisionDetect = function(){
  for (j = 0; j < balls.length; j++) {
    //if (!(this === balls[j])) { //checks if the balls are not the same
      if (balls[j].exist) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exist = false;
        count = count - 1;
        para.textContent = "Ball Count: " + count;
      }
    }
  }
}










var balls = [];//To store all our balls.
var evil = new EvilCircle();
evil.setControls();

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';// set BG to semi-transparent black
  ctx.fillRect(0, 0, width, height);//draws a rectangle of the color across the whole width and height of the canvas


  while (balls.length < 50) {
    var ball = new Ball();//Creates a new instance of our Ball()
    balls.push(ball);//push()es it onto the end of our balls array,only if Num balls array is less than 25
    count++;
    para.textContent = 'Ball count: ' + count;
  }

  for (i = 0; i < balls.length; i++) {
    if (balls[i].exist){
    // if (balls[i] = this.exist = true){
    balls[i].draw();// draw each ball on canvas
    balls[i].update();//updates to position and velocity in time for the next frame
    balls[i].collisionDetect();//checks if balls collide then bounce of eachother
    //and change colour if they do
    }
  }
  evil.draw();
  evil.checkBounds();
  evil.collisionDetect();

  requestAnimationFrame(loop);//

}


loop();//starts the animation

// loops through all the balls in the balls array, and runs each ball's draw() and update() 
// function to draw each one on the screen, then do the necessary updates to position and velocity 
// in time for the next frame.

// Runs the function again using the requestAnimationFrame() method — when this method is 
// constantly run and passed the same function name, it will run that function a set number of 
// times per second to create a smooth animation. This is generally done recursively — which means 
// that the function is calling itself every time it runs, so it will run over and over again.








