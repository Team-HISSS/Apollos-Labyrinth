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

  // push();
  //   background(0, 220, 0, 0);
  //   image(harpySprite, 0, 200);
  //   flyHarpy.push(get(5, 340, 65, 45));
  //   flyHarpy.push(get(70, 340, 70, 45));
  //   flyHarpy.push(get(140, 340, 50, 45));
  // pop();

  push();
    background(220, 220, 220, 0);
    image(harpySprite, 0, 0);
    let j = 1;
    let startFrame = 0;
    let numOfFrames = 4;
    for(let i = startFrame; i < numOfFrames; i++){
      flyHarpyLeft.push(get((i * harpySize) - 4, (j * harpySize) + 8, harpySize, harpySize)); // Vertical offset by 8 pixels and horizontal by 4 pixels
      flyHarpyRight.push(get((i * harpySize) - 4, ((j + 1) * harpySize) + 8, harpySize, harpySize)); 
    }
  pop();

  push()
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

// Captures the arrow
function captureKeys(){
  clear();
  push();
  image(keySheet, 200, 200, 50,50);
  keyImage = get(200,200,50,50);
  pop();
}

// Captures the frames of right moving archer
function captureMovement(){

  let startFrame = 4;
  let numOfFrames = 8;

  push();
  image(archerSprite, 0, 0);
  
  for(let i = startFrame, j = 2; i < startFrame + numOfFrames; i++){
    if(i < startFrame + 4){
      up.push(get((i * 126) - 26, 122 * j, 126, 122));
    }else{
      up.push(get((i * 126) - 22, 122 * j, 126, 122));
    }
    
  }
  
  for(let i = startFrame, j = 4; i < startFrame + numOfFrames; i++){
    if(i < startFrame + 4){
      right.push(get((i * 126) - 26, (122 * j) + 16, 126, 122));
    }else{
      right.push(get((i * 126) - 22, (122 * j) + 16, 126, 122));
    }
  }

  for(let i = startFrame, j = 6; i < startFrame + numOfFrames; i++){
    if(i < startFrame + 4){
      down.push(get((i * 126) - 26, 122 * j, 126, 122));
    }else{
      down.push(get((i * 126) - 22, 122 * j, 126, 122));
    }
  }
  
  for(let i = startFrame, j = 0; i < startFrame + numOfFrames; i++){
    if(i < startFrame + 4){
      left.push(get((i * 126) - 26, 122 * j, 126, 122));
    }else{
      left.push(get((i * 126) - 22, 122 * j, 126, 122));
    }
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

function captureHealthBar(){
  push();
    image(heartSheet, 0, 0);
    background(220, 220, 220, 0);
    heartCapture.push(get(22, 240, 347, 105));
    heartCapture.push(get(22, 240 + 105, 347, 105));
    heartCapture.push(get(22, 240 + 105 * 2, 347, 105));
  pop();
}

function captureEnemyBar(){
  push();
    background(220, 220, 220, 0);
    image(enemyHud, 0, 0);
    for(let i = 0; i < 6; i ++){
      if(i != 2){
        enemyHudCapture.push(get(43, 175 + i * 18, 108, 18));
      }
    }
  pop();
}

function captureEasterEgg(){
  push();
    image(architSheet, 0, 0);
    easterEggCapture.push(get(36, 260, 25, 25)); // For developers only
    easterEggCapture.push(get(548, 611, 25, 25)); // For health increase
  pop();
}

function captureBalista(){
  image(balSheet, 0,0,400,400);  
  balista1 = get(0, 0, 75, 80);
  balista2 = get(0,87, 75, 80);
  balista3 = get(0,175, 75, 80);
  balista4 = get(0,265, 75, 80);
  balArrow = get(33,0,12.5, 57.5);
  balList = [balista1, balista2, balista3, balista4];
}
function captureDiamonds(){
  push();
    image(objectSheet, 0, 0);
    easterEggCapture.push(get(3, 140, 24, 45));
  pop();
}

function captureHydra(){
  push();
    image(hydraSheet, 0, 0);
    hydraRight.push(get(3, 194, 75, 90));
    hydraRight.push(get(79, 194, 75, 90));
    hydraRight.push(get(154, 194, 75, 90));
    hydraRight.push(get(228, 194, 75, 90));
    hydraRight.push(get(300, 194, 75, 90));
    hydraRight.push(get(378, 194, 80, 90));
    hydraRight.push(get(460, 194, 80, 90));
    hydraRight.push(get(541, 194, 77, 90));
  pop();

}

function captureHydraMirror(){
  push();
    image(hydraSheetMirror, 0, 0);
    hydraLeft.push(get(759, 194, 75, 90));
    hydraLeft.push(get(683, 194, 75, 90));
    hydraLeft.push(get(608, 194, 75, 90));
    hydraLeft.push(get(534, 194, 75, 90));
    hydraLeft.push(get(462, 194, 75, 90));
    hydraLeft.push(get(379, 194, 80, 90));
    hydraLeft.push(get(297, 194, 80, 90));
    hydraLeft.push(get(219, 194, 77, 90));
  pop();

}

// Captures all the animation of the archer
// Function has to be called before creating canvas
function captureAllAnimation(){
  createCanvas(640, 480);
    captureEnemyBar();
  createCanvas(626, 583);
    captureHealthBar();
  createCanvas(640, 640);
    captureEasterEgg();
  createCanvas(500, 832);
    captureDiamonds();
  createCanvas(400, 400);
    captureHarpy();
  createCanvas(400, 400);
    captureKnight();
    captureEnvironment();
    captureSnake();
  createCanvas(700, 200);
    captureArrow();
  createCanvas(837, 499);
    captureHydra();
  createCanvas(837, 499);
    captureHydraMirror();
  createCanvas(4032, 976);
    captureMovement();
    captureShoot();
    captureBalista();
    captureKeys();

  // createCanvas(4032, 976);
}

