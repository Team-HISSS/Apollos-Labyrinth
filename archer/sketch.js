let spritesheet;
let picture;

function preload(){
  spritesheet = loadImage('spritesheet.png');
  picture = loadImage('x.png');
}

let walk_up, run_right, run, shoot;
// let walkingAnimation = [];
// let shootingAnimation = [];
// let walkingUpAnimation = [];
let up = [];
let right = [];

function setup() {
  
  captureAllAnimation();
  createCanvas(4032, 976);
  walk_up = new Archer(up, 'w', 100, 100);
  run_right = new Archer(right, 'r', 100, 100);
  // walk = new Archer(walkingAnimation, 'w', 100, 100);
  // shoot = new Archer(shootingAnimation, 's', 100, 300);
  // run = new Archer(walkingAnimation, 'r', 100, 200);
  // walkUp = new Archer(walkingAnimation, 'w', 300, 100);
}
function grid(){
  image(picture, 0, 0);
  stroke(255);
  for(let i = -1; i <= 2; i++){
    line(150 + (i * 130), 0, 150 + (i * 130), height);
  }
  
  // line(150, 0, 150, height);
  // line(280, 0, 280, height);
  // line(536, 0, 536, height);
  
  stroke(255, 0, 0);
  for(let i = 0; i < 8; i++){
    line(540 + (i * 127), 0, 536 + (i * 127), height);
  }
  
  stroke(255);
  for(let i = 0; i <= 8; i ++){
    line(0, 122 * i, width, 122 * i);
  }
}

function draw() {
  background(0);
  // grid();
  // walk_up.draw();
  // walk.move_up();
  run_right.draw();
  run_right.move();
  
  
}