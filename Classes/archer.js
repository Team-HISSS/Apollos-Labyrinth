// Speed and Frame Rates of the archer in different actions
let archerWalkSpeed = 0.3;
let archerWalkFrameRate = 0.3;
let archerRunSpeed = 1;
let archerRunFrameRate = 1;
let archerShootSpeed = 0;
let archerShootFrameRate = 0.3;

let KEY_W = 87;
let KEY_A = 65;
let KEY_D = 68;
let KEY_S = 83;

// Class for the archer
class ArcherObj{
  constructor(animation, action, x, y){
    this.action = ' ';
    // this.chooseAction();
    // this.animation = animation;
    this.animationChoice = ' ';
    this.w = 100;
    this.h = 100;
    this.x = x;
    this.y = y;
    this.index = 0;
    this.size = 100;
    this.flip = 1;
  }
  
  // Chooses the action of the archer
  // Called in the constructor
  chooseAction(){
    switch(this.action){
      case 'w':
        this.speed = archerWalkSpeed;
        this.frameRate = archerWalkFrameRate;
      break;
      
      case 'r':
        this.speed = archerRunSpeed;
        this.frameRate = archerRunFrameRate;
      break;
      
      case 's':
        this.speed = archerShootSpeed;
        this.frameRate = archerShootFrameRate;
      break;
      
      case ' ':
        this.speed = 0;
        this.frameRate = 0;
    }
  }
  
  checkMovement(){
    if(keyIsDown(KEY_W)){
      print('w');
      this.run_up();
    }
    else if(keyIsDown(KEY_A)){
      print('a');
      this.run_left();
    }
    else if(keyIsDown(KEY_S)){
      print('s');
      this.run_down();
    }
    else if(keyIsDown(KEY_D)){
      print('d');
      this.run_right();
    }
  }

  // Draws the frame
  draw(){
    this.chooseAction();
    
    // Run
    if(this.action == ' '){
      image(up[0], this.x, this.y, this.size, this.size)
    }
    else if(this.action == 'r'){
      if(this.animationChoice == 'rr'){
        let index = floor(this.index) % right.length;
        image(right[index], this.x, this.y, this.size, this.size);  
      }
      else if(this.animationChoice == 'ru'){
        let index = floor(this.index) % up.length;
        image(up[index], this.x, this.y, this.size, this.size);  
      }
      else if(this.animationChoice == 'rd'){
        let index = floor(this.index) % down.length;
        image(down[index], this.x, this.y, this.size, this.size);  
      }
      else if(this.animationChoice == 'rl'){
        let index = floor(this.index) % left.length;
        image(left[index], this.x, this.y, this.size, this.size);  
      }
    }
    
  }

  // Moves the archer relative to the canvas
  run_right(){
    this.action = 'r';
    this.animationChoice = 'rr';
    this.index += this.frameRate * 0.45;
    this.x += this.speed * 3.00;
    // Edge case
    // if(this.x > width){
    //   this.x = -this.w;
    // }
  }

  
  run_left(){
    this.action = 'r';
    this.animationChoice = 'rl';
    this.index += this.frameRate * 0.45;
    this.x -= this.speed * 3.00;
    // Edge case
    // if(this.x < -this.w){
    //   this.x = this.w;
    // }
  }

  run_up(){
    this.action = 'r';
    this.animationChoice = 'ru';
    this.index += this.frameRate * 0.75;
    this.y -= this.speed * 2.00;
    // Edge case
    // if(this.y < -this.h){
    //   this.y = height + this.h/2
    // }
  }

  run_down(){
    this.action = 'r';
    this.animationChoice = 'rd';
    this.index += this.frameRate * 0.75;
    this.y += this.speed * 2.00;
    // Edge case
    // if(this.y > height){
    //   this.y = -this.h;
    // }
  }
  
  // Moves the archer relative to the canvas
  move(){
    this.action = 'r';
    this.animationChoice = 'rr';
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
