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
    this.w = this.animation[0].width;
    this.x = x;
    this.y = y;
    this.index = 0;
    this.size = this.animation.length;
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
    image(this.animation[index], this.x, this.y);
  }
  
  // Moves the archer relative to the canvas
  move(){
    this.index += this.frameRate * 0.75;
    this.x += this.speed * 2.00;
    if(this.x > width){
      this.x = -this.w
    }
  }
  
}
