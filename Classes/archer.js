// Speed and Frame Rates of the archer in different actions
let archerWalkSpeed = 0.3;
let archerWalkFrameRate = 0.3;
let archerRunSpeed = 3.10;
let archerRunFrameRate = 0.34;
let archerShootSpeed = 0;
let archerShootFrameRate = 0.17;

let shootingFrameCount = 4;
let runningFrameCount = 8;

let wall_constraint_x = (126/3 + 20/2);
let wall_constraint_y = (122/3 + 20/2);

let door_constraint_x = (126/3 + 20/2);
let door_constraint_y = (122/3 + 20/2);

let harpy_constraint_x = (126/6 + harpy_center_radius/2);
let harpy_constraint_y = (122/6 + harpy_center_radius/2);

let easterEgg_center_radius = 10;
let easterEgg_constraint_x = easterEgg_center_radius + 126/3;
let easterEgg_constraint_y = easterEgg_center_radius + 122/3;

let currFrameCount = 0;

// Keys codes
let KEY_W = 87;
let KEY_A = 65;
let KEY_D = 68;
let KEY_S = 83;
let KEY_SPACE = 32;

// Class for the archer
class ArcherObj{
  constructor(x, y, rx, ry, k, rooms){ // Possibility for error -> rx, ry not passed
    this.roomNumber = k;
    this.rx = rx;
    this.ry = ry;
    this.action = ' ';
    this.rooms = rooms; // getting the room list
    // this.chooseAction();
    // this.animation = animation;
    this.animationChoice = ' ';
    this.w = 126;
    this.h = 122;
    this.x = x;
    this.y = y;
    this.dead = false;
    this.index = 0;
    this.shootIndex = 0;
    this.size = 100;
    this.flip = 1;
    this.width = this.rx*400 +400;
    this.height = this.ry*400 + 400;
    this.shootTrigger = false;
    this.inRoom = false;
    this.transition = false;
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
    let theta = [0,0];
    
    if(keyIsDown(KEY_W)){
      // print('w');
      theta = this.run_up();
    }
    else if(keyIsDown(KEY_A)){
      // print('a');
      theta = this.run_left();
    }
    else if(keyIsDown(KEY_S)){
      // print('s');
      theta = this.run_down();
    }
    else if(keyIsDown(KEY_D)){
      // print('d');
      theta = this.run_right();
    }
    if(keyIsDown(KEY_SPACE)){
      // print('space');
      // this.shoot();
      if (currFrameCount < frameCount - 30) {
        currFrameCount = frameCount;
        this.shoot();
        // print('Arrow : ' + arrowIndex)
        game.arrows[arrowIndex].fired = true;
        game.arrows[arrowIndex].setDirection(this.x + 50, this.y + 50, this.animationChoice);
        arrowIndex++;
        if(arrowIndex >= game.arrows.length - 1){

          arrowIndex = 0;
        }
      }
    }
    this.check_collision_with_easterEgg();
    this.check_collision_with_harpy();

    // If player wants to move
    // if(theta != [0, 0] && (this.check_collision_with_door(theta[0], theta[1]) || this.check_collision_with_walls(theta[0], theta[1]))){
    if(theta != [0, 0]){
      // If player is not colliding with an open door and colliding with walls
      if(!this.check_collision_with_open_door(theta[0], theta[1]) && this.check_collision_with_walls(theta[0], theta[1])){
        theta = [0,0];
      }
    }

    // Position update according to movement
    this.x += theta[0];
    this.y += theta[1];

  }

  // Draws the frame
  draw(){
    this.chooseAction();
    push();
    // var roomOffsetX = game.player.rx * 400;
    // var roomOffsetY = game.player.ry *400;
    // translate(roomOffsetX, roomOffsetY)
    
    // Temporary: Boundary
    // rect(this.x, this.y, this.w, this.h);
    
    // Run
    if(this.action == ' '){
      // print(this.x);
      image(up[0], this.x, this.y, this.w, this.h)
    }
    // If the action is run
    else if(this.action == 'r'){
      let index = floor(this.index) % runningFrameCount;
      // Animation choice based on direction
      switch(this.animationChoice){
        case 'rr':
          image(right[index], this.x, this.y, this.w, this.h);  
          break;
        
        case 'ru':
          image(up[index], this.x, this.y, this.w, this.h); 
          break;
        
        case 'rl':
          image(left[index], this.x, this.y, this.w, this.h);  
          break;
        
        case 'rd':
          image(down[index], this.x, this.y, this.w, this.h); 
          break;
      }
    }
    // If action is shoot
    else if((this.action == 's')){
      // If the shoot is triggered and the frames are not over
      if(this.shootTrigger == true && this.shootIndex < shootingFrameCount){
        let index = floor(this.shootIndex) % shootingFrameCount;
        
        switch(this.animationChoice){
          case 'rr':
            image(shootRight[index], this.x, this.y, 126, 122);  
            break;
          
          case 'ru':
            image(shootUp[index], this.x, this.y, 126, 122);  
            break;
          
          case 'rl':
            image(shootLeft[index], this.x, this.y, 126, 122);  
            break;
          
          case 'rd':
            image(shootDown[index], this.x, this.y, 126, 122);  
            break;
        }

        this.shootIndex += this.frameRate;
      }
      // If the shoot is triggered but frames are finished
      else if(this.shootTrigger == true){
        this.shootTrigger = false;
        this.shootIndex = 0;
        this.action = 'r';
      }
    }
    pop();
  }

  check_collision_with_walls(thetaX, thetaY){
    for(let wall of game.walls){
      let horizontalDistance = abs((this.x + this.w/2 + thetaX) - (wall.x + wall_center_radius));
      let verticalDistance = abs((this.y + this.h/2 + thetaY) - (wall.y + wall_center_radius));
      if(verticalDistance < wall_constraint_y && horizontalDistance < wall_constraint_x){
        // print(verticalDistance, horizontalDistance);
        // print('Player: Collision with wall');
        return true;
      }
    }

    return false;
  }

  // Checks if there is an open door and if there is a collision with open door
  check_collision_with_open_door(thetaX, thetaY){
    for(let door of game.doors){
      let horizontalDistance = abs((this.x + this.w/2 + thetaX) - (door.x + door.size/2));
      let verticalDistance = abs((this.y + this.h/2 + thetaY) - (door.y + door.size/2));

      // If door is open, i.e. true
      if (door.open){ 
        if(verticalDistance < wall_constraint_y && horizontalDistance < wall_constraint_x){
          //print('Player: Collision with door');
          return true;
        }
      }
    }

    return false;
  }


  check_collision_with_harpy(){
    for(let harpy of game.harpies){
      let horizontalDistance = abs((this.x + this.w/2) - (harpy.x + harpy_center_radius));
      let verticalDistance = abs((this.y + this.h/2) - (harpy.y + harpy_center_radius));

      // If harpy is not dead
      if (!harpy.dead){ 
        if(verticalDistance <  40 && horizontalDistance < 30){
          //print('Player: Collision with harpy');
          
          // If the easter egg for ultimate kill power is found
          let flag = false;
          
          for(let egg of game.easterEggs){
            // If the easter egg is taken, the archer can kill the harpies on contact
            // !!! Only for developers !!!
            if(egg.taken && egg.index == 0){
              harpy.isAlive = false;
              game.tm.rooms[this.roomNumber].numEnemies -= 1;  
              flag = true;
              break;
            }
          }
          if(!flag){
            this.dead = true;
          }
        }
      }
    }    
  }

  check_collision_with_snake(){
    for(let snake of game.snakes){
      let horizontalDistance = abs((this.x + this.w/2) - (snake.x + 15));
      let verticalDistance = abs((this.y + this.h/2) - (harpy.y + 15));

      // If harpy is not dead
      if (snake.isAlive){ 
        if(verticalDistance <  harpy_constraint_y && horizontalDistance < harpy_constraint_x){
          //print('Player: Collision with harpy');
          
          // If the easter egg for ultimate kill power is found
          let flag = false;
          
          for(let egg of game.easterEggs){
            // If the easter egg is taken, the archer can kill the harpies on contact
            // !!! Only for developers !!!
            if(egg.taken && egg.index == 0){
              harpy.dead = true;
              game.tm.rooms[this.roomNumber].numEnemies -= 1;  
              flag = true;
              break;
            }
          }
          if(!flag){
            this.dead = true;
          }
        }
      }
    }    
  }

  check_collision_with_specific_harpy(harp){
      let horizontalDistance = abs((this.x + this.w/2) - (harp.x + harpy_center_radius));
      let verticalDistance = abs((this.y + this.h/2) - (harp.y + harpy_center_radius));

      // If harpy is not dead
      if (!harp.dead){ 
        if(verticalDistance <  harpy_constraint_y && horizontalDistance < harpy_constraint_x){
          //print('Player: Collision with harpy');
          // If the easter egg for ultimate kill power is found
          let flag = false;
          
          for(let egg of game.easterEggs){
            // If the easter egg is taken, the archer can kill the harpies on contact
            // !!! Only for developers !!!
            if(egg.taken && egg.index == 0){
              harpy.dead = true;
              game.tm.rooms[this.roomNumber].numEnemies -= 1;  
              flag = true;
              break;
            }
          }
          if(!flag){
            this.dead = true;
          }
        }
      }   
  }
  check_collision_with_easterEgg(){
    // If harpy is not dead
    for( let egg of game.easterEggs){
      let horizontalDistance = abs((this.x + this.w/2) - (egg.x + easterEgg_center_radius));
      let verticalDistance = abs((this.y + this.h/2) - (egg.y + easterEgg_center_radius));
      if (!egg.taken){ 
        if(verticalDistance < easterEgg_constraint_y && horizontalDistance < easterEgg_constraint_x){
          //print('Player: Collision with easter egg');
          egg.taken = true;
      
        }
      }
    }
  }

  // Moves the archer relative to the canvas
  run_right(){
    let delta = 0;
    this.action = 'r';
    this.animationChoice = 'rr';
    this.index += this.frameRate;
    // this.x += this.speed * 3.00;
    delta += this.speed;

    // Edge case
    if(this.x > this.width+40){
      this.rx += 1;
      this.width = this.rx*400 + 400;
      for(var k = 0; k < this.rooms.length; k++){
        if (this.rooms[k].x == this.rx && this.rooms[k].y == this.ry){
          this.roomNumber = this.rooms[k].roomNumber;
        } 
      }
      this.transition = true;
    }
    else if (this.x < this.rx*400 - 40){
      this.rx -= 1;
      this.width = this.rx*400 + 400;
      for(var k = 0; k < this.rooms.length; k++){
        if (this.rooms[k].x == this.rx && this.rooms[k].y == this.ry){
          this.roomNumber = this.rooms[k].roomNumber;
        } 
      }
      this.transition = true;
    }

    return [delta, 0];
  }

  
  run_left(){
    let delta = 0;
    this.action = 'r';
    this.animationChoice = 'rl';
    this.index += this.frameRate;
    // this.x -= this.speed * 3.00;
    delta -= this.speed;

    //Edge case
    if(this.x > this.width + 40){
      this.rx += 1;
      this.width = this.rx*400 + 400;
      for(var k = 0; k < this.rooms.length; k++){
        if (this.rooms[k].x == this.rx && this.rooms[k].y == this.ry){
          this.roomNumber = this.rooms[k].roomNumber;
        } 
      }
      this.transition = true;
    }
    else if (this.x < this.rx*400 -40){
      this.rx -= 1;
      this.width = this.rx*400 + 400;
      for(var k = 0; k < this.rooms.length; k++){
        if (this.rooms[k].x == this.rx && this.rooms[k].y == this.ry){
          this.roomNumber = this.rooms[k].roomNumber;
        } 
      }
      this.transition = true;
    }

    return [delta, 0];
  }

  run_up(){
    let delta = 0;
    this.action = 'r';
    this.animationChoice = 'ru';
    this.index += this.frameRate;
    // this.y -= this.speed * 2.00;
    delta -= this.speed;
    
    // Edge case
    if(this.y > this.height - 0){
      this.ry += 1;
      this.height = this.ry * 400 + 400;
      for(var k = 0; k < this.rooms.length; k++){
        if (this.rooms[k].x == this.rx && this.rooms[k].y == this.ry){
          this.roomNumber = this.rooms[k].roomNumber;
        } 
      }
      if (this.y > this.height -30){
        this.transition = true;
      }
    }
    else if (this.y< this.ry*400 +0){
      this.ry -= 1;
      this.height = this.ry*400 + 400;
      for(var k = 0; k < this.rooms.length; k++){
        if (this.rooms[k].x == this.rx && this.rooms[k].y == this.ry){
          this.roomNumber = this.rooms[k].roomNumber;
        } 
      }
      if (this.y > this.height +30){
        this.transition = true;
      }
    }

    return [0, delta];
  }

  run_down(){
    let delta = 0;
    this.action = 'r';
    this.animationChoice = 'rd';
    this.index += this.frameRate;
    // this.y += this.speed * 2.00;
    delta += this.speed;
    
    // Edge case
    if(this.y > this.height - 0){
      this.ry += 1;
      this.height = this.ry * 400 + 400;
      for(var k = 0; k < this.rooms.length; k++){
        if (this.rooms[k].x == this.rx && this.rooms[k].y == this.ry){
          this.roomNumber = this.rooms[k].roomNumber;
        } 
      }
      if (this.y > this.height -30){
        this.transition = true;
      }
    }
    else if (this.y< this.ry*400 +0){
      this.ry -= 1;
      this.height = this.ry*400 + 400;
      for(var k = 0; k < this.rooms.length; k++){
        if (this.rooms[k].x == this.rx && this.rooms[k].y == this.ry){
          this.roomNumber = this.rooms[k].roomNumber;
        } 
      }
      if (this.y > this.height +30){
        this.transition = true;
      }
    }

    return [0, delta];
  }

  // Triggers shooting animation
  shoot(){
    this.action = 's';
    this.shootTrigger = true;
  }
  
  // Moves the archer relative to the canvas
  // For starting screen
  move(){
    this.action = 'r';
    this.animationChoice = 'rr';
    this.index += this.frameRate/2; // * 0.17
    // print('Capture.js: this.x ' + this.x)
    this.x += this.speed - 1.60; ///* 1.50;
    this.x += int(this.x) ///* 1.50;
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
