// Position of each frame of the walking archer
let walkFrame = [31.5, 108.5, 182.25, 259, 340.75, 420.5, 500.75, 588, 669, 751.75, 833.5, 917];

// Captures the walkinga animation
function captureWalkingAnimation(){
  push();
  image(spritesheet, 0, 0);
  
  for(let i = 4; i < walkFrame.length; i++){  
    walkingAnimation.push(get(walkFrame[i] - 22, 0, 44, 90));  
  }
  pop();
}

// Captures the shooting animation
function captureShootingAnimation(){
  push();
  image(spritesheet, 0, 0);
  
  for(let i = 0; i <12; i++){
    shootingAnimation.push(get(75.75 * i, 180, 75.75, 90));  
  }
  pop();
}

// Captures all the animation of the archer
// Function has to be called before creating canvas
function captureAllAnimation(){
  createCanvas(1212, 419);
  captureWalkingAnimation();
  captureShootingAnimation();
}