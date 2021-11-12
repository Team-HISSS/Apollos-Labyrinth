// Caputres the environment
function captureEnvironment(){

  push();
    image(architSheet, 0, 0, 400, 400);
    tileSquare = get(120, 180, 60, 60);
    tileUneven = get(180, 180, 60, 60);
    tileFancy = get(240, 220, 60, 60);
    doorway = get(360, 180, 40, 40);
    door = get(369, 367, 22, 30);
    wall1 = get(20, 300, 60, 60);
    roof = get(320, 45, 60, 55);
    wall2 = get(200, 120, 40, 40);
  pop();
}

// Captures the frames of the harpy
function captureHarpy(){

  push();
    background(0, 220, 0, 0);
    image(harpySprite, 0, 200);
    flyHarpy.push(get(5, 340, 65, 45));
    flyHarpy.push(get(70, 340, 70, 45));
    flyHarpy.push(get(140, 340, 50, 45));
  pop();
}

// Captures the frames of the knight
function captureKnight(){

  push();
    background(0, 220, 0, 0);
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
  pop();
}

// Captures the frames of the snake
function captureSnake(){
  
  push();
    image(snakeSheet, 0, 0, 400, 400);
    //3 horizontal animations
    snake_1 = get(10, 130, 20, 35);
    snake_2 = get(47.5, 130, 20, 35);
    snake_3 = get(87.5, 130, 20, 35);
    //2 vertical animations
    snake_5 = get(50, 360, 20, 40);
    snake_6 = get(90, 360 , 20 ,40);
    snakeAnimations = [snake_1, snake_2, snake_3, snake_5, snake_6];
  pop();
}

// Captures the arrow
function captureArrow(){
  
  push();
    background(220, 220, 220, 0);
    image(arrowImg, 0, 0);
    arrowCapture = get(0, 0, 700, 200);
  pop();
}

// Captures the frames of right moving archer
function captureUp(){

  push();
  image(archerSprite, 0, 0);
  let j = 2;
  for(let i = 0; i < 8; i++){
    up.push(get(540 + (i * 127) - 50, 122 * j, 100, 100));
  }
  pop();
}

function captureRight(){

  push();
  image(archerSprite, 0, 0);
  let j = 4;
  for(let i = 0; i < 8; i++){
    right.push(get(540 + (i * 127) - 50, 122 * j, 100, 100));
  }
  pop();
}

function captureDown(){
  push();
  image(archerSprite, 0, 0);
  let j = 6;
  for(let i = 0; i < 8; i++){
    down.push(get(540 + (i * 127) - 50, 122 * j, 100, 100));
  }
  pop();
}

function captureLeft(){
  push();
  image(archerSprite, 0, 0);
  let j = 0;
  for(let i = 0; i < 8; i++){
    left.push(get(540 + (i * 127) - 50, 122 * j, 100, 100));
  }
  pop();
}

function captureShoot(){
  push();
  image(archerSprite, 0, 0);

  let startFrame = 28;
  let numOfFrames = 4;
  for(let i = startFrame, j = 0; i < startFrame + numOfFrames; i++){
    shootLeft.push(get((i * 126), 122 * j, 126, 122));
  }  
  for(let i = startFrame, j = 2; i < startFrame + numOfFrames; i++){
    shootUp.push(get((i * 126), 122 * j, 126, 122));
  }
  for(let i = startFrame, j = 4; i < startFrame + numOfFrames; i++){
    shootRight.push(get((i * 126), 122 * j, 126, 122));
  }
  for(let i = startFrame, j = 6; i < startFrame + numOfFrames; i++){
    shootDown.push(get((i * 126), 122 * j, 126, 122));
  }
  pop();
}

// Captures all the animation of the archer
// Function has to be called before creating canvas
function captureAllAnimation(){
  createCanvas(400, 400);
    captureHarpy();
  createCanvas(400, 400);
    captureKnight();
    captureEnvironment();
    captureSnake();
  createCanvas(700, 200);
    captureArrow();
  createCanvas(4032, 976);
    captureUp();
    captureRight();
    captureLeft();
    captureDown();
    captureShoot();
  // createCanvas(4032, 976);
}
