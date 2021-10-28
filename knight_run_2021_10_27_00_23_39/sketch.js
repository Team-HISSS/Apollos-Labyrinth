var spriteSheet;
var runAnimation = [];
function preload(){
  spriteSheet = loadImage('SpriteSheet.png');
}
class knightObj{
  constructor(x, y, speed){
    this.speed = speed;
    this.index = 0;
    this.x = x;
    this.y = y
    
    
  }
  run(){
  var curIndex = floor(this.index%runAnimation.length);
    push();
    scale(-1, 1);
  // translate(-200, 200);
  // rotate(PI/2);
  
    image(runAnimation[curIndex],this.x, this.y);
    pop();
  }
  runAnimate(){
    this.index += this.speed;
    this.x -= this.speed*5;
    if (this.x < -width){
      this.x = 40;
    }
  }
}
var index = 0;
var speed = 0.3;
var knight;
function setup() {
  createCanvas(400, 400);
  background(220, 220, 220, 0);
  image(spriteSheet, 0, 200, 400, 50);
  runAnimation.push(get(0, 206, 40, 44));
  runAnimation.push(get(40, 206, 40, 44));
  runAnimation.push(get(80, 206, 40, 44));
  runAnimation.push(get(120, 206, 40, 44));
  runAnimation.push(get(160, 206, 40, 44));
  runAnimation.push(get(200, 206, 40, 44));
  runAnimation.push(get(240, 206, 40, 44));
  runAnimation.push(get(280, 206, 40, 44));
  runAnimation.push(get(320, 206, 35, 43));
  runAnimation.push(get(355, 206, 40, 44));
  //imageMode(CENTER);
  knight = new knightObj(-200, 200, 0.3);
  
}

function draw() {
  background(0, 255, 0);
  var curIndex = floor(index%runAnimation.length);
  knight.run();
  knight.runAnimate();
//   push();
//   scale(-1, 1);
//   // translate(-200, 200);
//   // rotate(PI/2);
  
//   image(runAnimation[curIndex],-410, 200);
//   index = index + speed;
//   pop();
    // image(runAnimation[8],200, 200);
  
}