// Captures the frames of right moving archer

function captureRight(){
  push();
  background(225, 225, 225, 0);
  image(archerSprite, 0, 0);
  let j = 4;
  for(let i = 0; i < 8; i++){
    archerRight.push(get(540 + (i * 127) - 50, 122 * j, 100, 100));
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
  // captureUp();
  captureRight();
  createCanvas(4032, 976);
}


// // Position of each frame of the walking archer
// let walkFrame = [31.5, 108.5, 182.25, 259, 340.75, 420.5, 500.75, 588, 669, 751.75, 833.5, 917];

// // Captures the walkinga animation
// function captureWalkingAnimation(){
//   push();
//   image(spritesheet, 0, 0);
  
//   for(let i = 4; i < walkFrame.length; i++){  
//     walkingAnimation.push(get(walkFrame[i] - 22, 0, 44, 90));  
//   }
//   pop();
// }

// // Captures the shooting animation
// function captureShootingAnimation(){
//   push();
//   image(spritesheet, 0, 0);
  
//   for(let i = 0; i <12; i++){
//     shootingAnimation.push(get(75.75 * i, 180, 75.75, 90));  
//   }
//   pop();
// }

// // Captures the walking animation
// function captureWalkingUpAnimation(){
//   push();
//   image(spritesheet, 0, 0);
  
//   for(let i = 3; i <7; i++){
//     walkingUpAnimation.push(get(75.75 * i, 280, 75.75, 90));  
//   }
//   walkingUpAnimation.push(get(walkFrame[5] - 37.875, 0, 75.75, 90));
//   walkingUpAnimation.push(get(walkFrame[4] - 37.875, 0, 75.75, 90));
//   pop();
// }

// function captureUp(){
//   push();
//   image(picture, 0, 0);
//   let j = 2;
//   for(let i = 0; i < 8; i++){
//     up.push(get(540 + (i * 127) - 50, 122 * j, 100, 100));
//   }
//   pop();
// }
