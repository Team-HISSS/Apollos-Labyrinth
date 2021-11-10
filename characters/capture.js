// Captures the frames of right moving archer

// function captureRight(){
//   push();
//   background(225, 225, 225, 0);
//   image(archerSprite, 0, 0);
//   let j = 4;
//   for(let i = 0; i < 8; i++){
//     archerRight.push(get(540 + (i * 127) - 50, 122 * j, 100, 100));
//   }
//   pop();
// }

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

// Captures all the animation of the archer
// Function has to be called before creating canvas
function captureAllAnimation(){
  // createCanvas(1212, 419);
  // captureWalkingAnimation();
  // captureShootingAnimation();
  // captureWalkingUpAnimation();
  createCanvas(4032, 976);
  captureUp();
  captureRight();
  captureLeft();
  captureDown();
  createCanvas(4032, 976);
}
