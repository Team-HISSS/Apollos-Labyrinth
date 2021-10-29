let spritesheet;

function preload(){
  spritesheet = loadImage('spritesheet.png');
}

let walk, run, shoot;
let walkingAnimation = [];
let shootingAnimation = [];
function setup() {
  
  captureAllAnimation();
  createCanvas(500, 500);
  
  walk = new Archer(walkingAnimation, 'w', 100, 100);
  shoot = new Archer(shootingAnimation, 's', 100, 300);
  run = new Archer(walkingAnimation, 'r', 100, 200);
}


function draw() {
  background(0);
  walk.draw();
  walk.move();
  shoot.draw();
  shoot.move();
  run.draw();
  run.move();
  
}