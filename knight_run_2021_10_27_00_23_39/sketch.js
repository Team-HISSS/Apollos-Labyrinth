var spriteSheet;
var runAnimation = [];
function preload(){
  spriteSheet = loadImage('SpriteSheet.png');
}
var index = 0;
var speed = 0.4;

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
  
}

function draw() {
  background(0, 255, 0);
  var curIndex = floor(index%runAnimation.length);
  
  push();
  scale(-1, 1);
  // translate(-200, 200);
  // rotate(PI/2);
  
  image(runAnimation[curIndex],-200, 200);
  index = index + speed;
  pop();
    // image(runAnimation[8],200, 200);
  
}