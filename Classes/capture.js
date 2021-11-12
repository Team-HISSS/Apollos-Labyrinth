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
  createCanvas(4032, 976);
  captureUp();
  captureRight();
  captureLeft();
  captureDown();
  captureShoot();
  createCanvas(4032, 976);
}
