function captureUp(){
  push();
  image(picture, 0, 0);
  let j = 2;
  for(let i = 0; i < 8; i++){
    up.push(get(540 + (i * 127) - 50, 122 * j, 100, 100));
  }
  pop();
}

function captureRight(){
  push();
  image(picture, 0, 0);
  let j = 4;
  for(let i = 0; i < 8; i++){
    right.push(get(540 + (i * 127) - 50, 122 * j, 100, 100));
  }
  pop();
}

function captureDown(){
  push();
  image(picture, 0, 0);
  let j = 6;
  for(let i = 0; i < 8; i++){
    down.push(get(540 + (i * 127) - 50, 122 * j, 100, 100));
  }
  pop();
}

function captureLeft(){
  push();
  image(picture, 0, 0);
  let j = 0;
  for(let i = 0; i < 8; i++){
    left.push(get(540 + (i * 127) - 50, 122 * j, 100, 100));
  }
  pop();
}

// Captures all the animation of the archer
// Function has to be called before creating canvas
function captureAllAnimation(){
  createCanvas(4032, 976);
  captureUp();
  captureRight();
  captureDown();
  captureLeft();
  createCanvas(4032, 976);
}