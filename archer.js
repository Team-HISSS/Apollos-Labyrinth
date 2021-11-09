// Speed and Frame Rates of the archer in different actions
let walkSpeed = 0.3;
let walkFrameRate = 0.3;
let runSpeed = 1;
let runFrameRate = 1;
let shootSpeed = 0;
let shootFrameRate = 0.3;

// Class for the archer
class Archer{
  constructor(animation, action, x, y){
    this.action = action;
    this.chooseAction();
    this.animation = animation;
    this.w = 100;
    this.h = 100;
    this.x = x;
    this.y = y;
    this.index = 0;
    this.size = this.animation.length;
    this.flip = 1;
  }
  
  // Chooses the action of the archer
  // Called in the constructor
  chooseAction(){
    switch(this.action){
      case 'w':
        this.speed = walkSpeed;
        this.frameRate = walkFrameRate;
      break;
      
      case 'r':
        this.speed = runSpeed;
        this.frameRate = runFrameRate;
      break;
      
      case 's':
        this.speed = shootSpeed;
        this.frameRate = shootFrameRate;
      break;
    }
  }
  
  // Draws the frame
  draw(){
    let index = floor(this.index) % this.size;
    // push();
    // translate(this.x, this.y);
    // rotate(PI/25);
    // if(this.index == 0){
    //   this.flip *= -1;
    // }
    
    // if(this.flip == 1){
    //   push();
    //   scale(-1, 1)
    //   image(this.animation[index], -this.x, this.y, 200, 200);
    //   pop();
    // }
    // else if(this.flip == -1){
    image(this.animation[index], this.x, this.y, 100, 100);  
    // }
    
    // pop();
  }
  
  // Moves the archer relative to the canvas
  move(){
    this.index += this.frameRate * 0.3;
    this.x += this.speed * 1.50;
    if(this.x > width){
      this.x = -this.w;
    }
  }
  
  move_down(){
    this.index += this.frameRate * 0.75;
    this.y += this.speed * 2.00;
    if(this.y > height){
      this.y = -this.h
    }
  }
  
   move_up(){
    this.index += this.frameRate * 0.75;
    this.y -= this.speed * 2.00;
    if(this.y < -this.h){
      this.y = height + this.h/2
    }
  }
}
