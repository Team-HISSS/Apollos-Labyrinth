//balista enemy class and functionality
class BalistaObj{
    constructor(x, y, rx, ry, ind, roomNum) {
      // print("HEREEEE");
        this.index = ind;
        this.x = x;
        this.y = y;
        this.rx = rx; 
        this.ry = ry; 
        this.roomNum = roomNum;
        this.numHits = 0;
        this.initAngle = random(0, 2 * PI);
        this.angle = this.initAngle;
        this.vec = createVector(0, 0);
        this.angleDir = 0;
        this.bullet = [new bulletObj(this.x, this.y, this.angle, roomNum)];
        this.states = [new BalistaShootState(), new BalistaChaseState(), new BalistaAvoidState(), new BalistaDeathState()]; // different state objects of the tank
        this.state = 0;
        //this.blast = new fireworkObj(2);
        this.dead = false;
        this.scored = false;
        this.particle =[];
      }

      draw() {
        push();
        translate(this.x, this.y);
        rotate(this.angle - 3 * PI/2);
        image(balista1, -20,-20,40,40);
        fill(255,255,0);
        ellipse(0,0,10,10);
        rotate(-this.angle - 3 * PI/2);
        translate(-this.x, -this.y);
        pop();
        if (this.numHits == 1){
          this.smoke();
        }
      }
      killed() {
        push();
        stroke(0);
        translate(this.x, this.y);
        rotate(this.angle - 3 * PI/2);
        image(balista3, -20,-20,40,40);
        fill(255,255,0);
        ellipse(0,0,10,10);

        pop();
      }
      decreaseAngle() {
        this.angle -= PI / 45;
      }
      increaseAngle() {
        this.angle += PI / 45;
      }
      updateAngle() { // update the angle of the tank to face the player tank.
        this.vec.set((game.player.x + game.player.w / 2) - this.x, (game.player.y + game.player.h/2) - this.y);
        var projectedAngle = this.vec.heading();
        if (projectedAngle < 0) {
          projectedAngle += 2 * PI;
        }
        var angleDiff = abs(projectedAngle - this.angle);
    
        if (angleDiff > PI / 90) {
          if (projectedAngle > this.angle) {
            this.angleDir = PI / 180;
          } else {
            this.angleDir = -(PI / 180);
          }
          if (angleDiff > TWO_PI - 5 * (PI / 180)) {
            this.angleDir = -this.angleDir;
          }
    
          this.angle += this.angleDir;
          if (this.angle > TWO_PI) {
            this.angle = 0; // -(PI - (PI/180));
          } else if (this.angle < 0) {
            this.angle = TWO_PI;
          }
        }
      }

      checkCollision(x, y) {
        if (dist(this.x, this.y, x, y) < 25) {
          return true;
        } else {
          return false;
        }
      }
      
      fire(){ // to start drawing the fire originating at the center of the enemy tank. 
            var p = new particleObj(this.x, this.y);
        // print(p);
        this.particle.push(p);
        //print(this.particle.length);
        for(var i = this.particle.length -1; i> 0; i--){
          // print(this.particle[i]);
          this.particle[i].update();
          this.particle[i].draw();
          if(this.particle[i].done()){
            this.particle.splice(i, 1);
          }
        }
      }
      smoke(){ // to start drawing the fire originating at the center of the enemy tank. 
        var p = new particleObj(this.x, this.y);
        p.r = 115;
        p.g = 130;
        p.b = 118;
      // print(p);
        this.particle.push(p);
      //print(this.particle.length);
       for(var i = this.particle.length -1; i> 0; i--){
        // print(this.particle[i]);
          this.particle[i].update();
          this.particle[i].draw();
          if(this.particle[i].done()){
            this.particle.splice(i, 1);
          }
        }
      }
}

class particleObj{ // Particle Object to create the particles for fire
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.alpha = 255;
    this.r = 226;
    this.g = 88;
    this.b = 34;
    this.vx = random(-1, 1);
    this.vy = random(-5, -1);
    
  }
  draw(){
     noStroke(); // drawing the particles with no stroke
    fill(this.r, this.g, this.b, this.alpha); // Color of fire
    ellipse(this.x, this.y, 10, 10); // draw the particle
  }
  update(){ // updating the position of the particle
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 25;
  }
  done(){ // checking if the particles transparency is negative or not
    if(this.alpha <0){
      return true
    }
    else {
      return false;
    }
  }
}


class explosionObj {
  constructor(a) {
    this.position = new p5.Vector(0, 0);
    this.direction = new p5.Vector(0, 0);
    this.size = random(1, 3);
    this.c1 = 136;
    this.c2 = 8;
    this.c3 = 8;
    if (a === 0) {
      this.c1 = random(0, 250);
    } else {
      this.c1 = random(100, 255);
    }
    if (a === 1) {
      this.c2 = random(0, 250);
    } else {
      this.c2 = random(100, 255);
    }
    if (a === 2) {
      this.c3 = random(0, 250);
    } else {
      this.c3 = random(100, 255);
    }
    this.timer = 0;
  }
  draw() {
    fill(this.c1, this.c2, this.c3, this.timer); 
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);

    this.position.x += this.direction.y * cos(this.direction.x);
    this.position.y += this.direction.y * sin(this.direction.x);
    this.position.y += 90 / (this.timer + 100);
    this.timer--;
  }
}


// class fireworkObj {
//   constructor(a) {
//     this.position = new p5.Vector(200, 380);
//     this.direction = new p5.Vector(0, 0);
//     this.target = new p5.Vector(mouseX, mouseY);
//     this.step = 0;
//     this.explosions = [];
//     for (var i = 0; i < 100; i++) { //cheanged the number of particles to 100
//       this.explosions.push(new explosionObj(a));
//     }
//   }
//   draw() {
//     fill(255, 255, 255);
//     ellipse(this.position.x, this.position.y, 2, 2);

//     this.position.add(this.direction);
//     if (
//       dist(this.position.x, this.position.y, this.target.x, this.target.y) < 4
//     ) {
//       this.step = 2;
//       for (var i = 0; i < this.explosions.length; i++) {
//         this.explosions[i].position.set(this.target.x, this.target.y);

//         this.explosions[i].direction.set(random(0, 2 * PI), random(-0.3, 0.3));
//         this.explosions[i].timer = 100; // explosion timer is now set to 100
//       }
//     }
//   }
// } 

// function checkFire() {
//   if (keyIsDown(32)) {
//     if (currFrameCount < frameCount - 10) {
//       currFrameCount = frameCount;
//       bullets[bulletIndex].fired = true;
//       bullets[bulletIndex].x = game.player.x + game.player.w / 2;
//       bullets[bulletIndex].y = game.player.y + game.player.h / 2;
//       bullets[bulletIndex].angle = game.player.angle - HALF_PI;
//       bullets[bulletIndex].blocked = false;

//       bulletIndex++;
//       if (bulletIndex > 3) {
//         bulletIndex = 0;
//       }
//     }
//   }
// }


class bulletObj {
  constructor(x, y, angle, roomNum) {
    this.x = x;
    this.y = y;
    this.fired = false;
    this.vec = createVector(1, 1); // creating a vector to shoot the bullet in a  given direction
    this.angle = angle;
    this.blocked = false;
    this.roomNum = roomNum; 
  }
  draw() {
    var wallCollision = false; // variable checks for wall collision
    var adversaryCollision = false; // variable checks for enemy collision
    push(); // droawing and translating the bullets
    translate(this.x, this.y);
    rotate(this.angle + PI);
    image(balArrow, -2.5, -10, 5, 20);
    fill(255,255,0);
    ellipse(0,0,10,10);
    rotate(-this.angle);
    this.vec.setMag(2);
    this.vec.setHeading(this.angle + HALF_PI);
    this.x += this.vec.x;
    this.y += this.vec.y;
    pop();
    for (var i = 0; i < game.walls.length; i++) {
      // checking for collision with the walls
      if (game.walls[i].checkCollisionB(this.x, this.y)) {
        this.blocked = true; // checks if the bullet has been blocked or not
        wallCollision = true;
      }
    }
    for (var i = 0; i < game.doors.length; i++) {
      // checking for collision with the walls
      if (game.doors[i].checkCollisionB(this.x, this.y)) {
        this.blocked = true; // checks if the bullet has been blocked or not
        wallCollision = true;
      }
    }

    // if(game.player.roomNum == this.roomNum){
    //   print("BULLET HERE");
    //   this.blocked = true; // checks if the bullet has been blocked or not
    //   wallCollision = true;
    // }
    
    if (this.blocked) {
      this.fired = false;
      if (wallCollision) {
        return false;
      } else if (adversaryCollision) {
        return true;
      }
    }
  }
  los(x, y, ind) { //checking if a bullet is in an enemy's line of sight
    var projectiony = 0; // projected y position of the bullet

    var projectionx = 0; // projected x position of the bullet 
    if (this.fired) { // Check for los only if the bullet is fired
      projectiony = tan(this.angle + HALF_PI) * (x - this.x) + this.y; // get the projected y location using y = mx +c
      projectionx = (y - this.y) / tan(this.angle + HALF_PI) + this.x; // get the projected x location using x = (y-c)/m
      if (dist(x, y, projectionx, projectiony) < 90) { // if the distance between the projected coordinates and the actual coordinates is less than 90, then the bullet is in sight
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}


// The enemy tank is in the shoot state if the distance between the enemy tank and the player is less than 150 pixels
// While in the shoot state the enemy tank sets the gun to face the player and then shoot bullet randomly
class BalistaShootState {
  constructor(x, y) {
    this.move = 1;
    this.velocity = createVector(1, 1);
  }
  execute(me) {
    var rand = int(random(0, 50)); // generating a random int between 0 and 50 for shooting
    if (dist(me.x, me.y, game.player.x + game.player.w / 2, game.player.y + game.player.h / 2) > 150) { // change state if the distance is greater than 150
      me.state = 1;
    }
    me.updateAngle(); // update the angle of the tank to face the player
    for (var i = 0; i < 4; i++) { // check collision with the players bullets
      if(game.arrows[i].fired){
      if (game.arrows[i].los(me.x, me.y, me.index)) { // if the tank is in the players line of sight switch to avoid state
        me.state = 2;
      }
      if (dist(me.x, me.y, game.arrows[i].x, game.arrows[i].y) < 40) {
        game.arrows[i].fired = false;
        me.numHits += 1;
        if (me.numHits == 2){
          me.state = 3;
        }
      }
    }
    if (me.bullet[0].fired) { // check if the tanks bullet hits the player or not
      if (dist(game.player.x + game.player.w/2, game.player.y + game.player.h/2, me.bullet[0].x, me.bullet[0].y) < 20) {
        //gameOver = true;
        me.bullet[0].fired = false; 
        game.player.health--;
      }
      for(var i = 0 ; i < game.balistas.length; i++){ //stop the bullet if it hits a destroyed enemy tank 
        if (i != me.index) {
          if (game.balistas[i].state == 3){
            if (dist(game.balistas[i].x, game.balistas[i].y, me.bullet[0].x, me.bullet[0].y) < 20){
              me.bullet[0].fired = false;
            }
          }
        }
      }
    }
    //checking collision with the player
      if (dist(me.x, me.y, game.player.x + game.player.w/2, game.player.y + game.player.h/2) < 20){
        this.velocity.setHeading(me.angle);
        this.velocity.setMag(-0.1);
        me.x += this.velocity.x;
        me.y += this.velocity.y;
      }
      // shooting action
    if (rand == 5 && !me.bullet[0].fired) { 
      var projectedAngle = me.vec.heading();
      if (projectedAngle < 0) {
        projectedAngle += 2 * PI;
      }
      var angleDiff = abs(projectedAngle - me.angle);
      if (angleDiff < PI / 90) {
        if (currFrameCount < frameCount - 10) {
          currFrameCount = frameCount;
          me.bullet[0].fired = true;
          me.bullet[0].x = me.x;
          me.bullet[0].y = me.y;
          me.bullet[0].angle = me.angle - PI / 2;
          me.bullet[0].blocked = false;
        }
      }
    }
    
  }
}
}

// The tank is in the Chase State when the distance between the enemy tank and the player is greater than 150 pixels. 
//Int this state the enemy tank chases the playeer tank. In the state the tank checks for collisions with enemy, 
//player and the walls. The tank also checks if it is in a bullets line of sight or if it is dead and changes to 
//a different state accordingly. (As done in the chase state)
class BalistaChaseState {
  constructor() {
    this.move = 0.5;
    this.velocity = createVector(1, 1);
  }
  execute(me) {

    this.move = 0.5;
    for (var i = 0; i < 4; i++) {
      if (game.arrows[i].fired){
      if (game.arrows[i].los(me.x, me.y, me.index)) {
        me.state = 2;
      } else if (dist(me.x, me.y, game.arrows[i].x, game.arrows[i].y) < 40) {
        game.arrows[i].fired = false;
        me.numHits += 1;
        if (me.numHits == 2){
          me.state = 3;
        }
      }
      }
    }
    if (dist(me.x, me.y, game.player.x + game.player.w /2, game.player.y + game.player.h/2) <= 150) {
      me.state = 0;
    }
    if (me.bullet[0].fired) {
      if (dist(game.player.x + game.player.w/2, game.player.y + game.player.h/2, me.bullet[0].x, me.bullet[0].y) < 20) {
        
        //gameOver = true;
        me.bullet[0].fired = false; 
        game.player.health--;
      }
      for(var i = 0 ; i < game.balistas.length; i++){
        if (i != me.index) {
          if (game.balistas[i].state == 3){
            if (dist(game.balistas[i].x, game.balistas[i].y, me.bullet[0].x, me.bullet[0].y) < 20){
              me.bullet[0].fired = false;
            }
          }
        }
      }
    }
    me.updateAngle();
    this.velocity.setHeading(me.angle);
    this.velocity.setMag(this.move);
    for (i = 0; i < game.walls.length; i++) {
      if (
        game.walls[i].checkCollision(me.x + this.velocity.x, me.y + this.velocity.y)
      ) {
        me.angle += PI / 180;
        this.move = -this.move;
        this.velocity.setMag(this.move);
      }
    }
    for (i = 0; i < game.balistas.length; i++) {
      if (i != me.index) {
        if (
          game.balistas[i].checkCollision(
            me.x + this.velocity.x,
            me.y + this.velocity.y
          )
        ) {
          me.angle += PI / 180;
          this.move = -this.move;
          this.velocity.setMag(this.move);
          // print("Here");
        }
      }
    }
    me.x += this.velocity.x;
    me.y += this.velocity.y;
    
  }
}

// The tank is in the avoidState when it is in a bullets line of sight. When in the avoid state the enemy tank rotates until the angle between the bullet and the tanks is more than 80 degrees and then tries to move away from the bullet. Also, in this checks the tank check for collision and if it hits the bullet then switches the state to dead. If the bullet is no more in the line of sight of the tank then go back to the shoot state. 
class BalistaAvoidState {
  constructor() {
    this.bulletAngle = 0;
    this.tankAngle = 0;
    this.velocity = createVector(1, 1);
    this.fire = [false, false, false, false];
    this.noFire = true;
    this.move = 1;
  }
  execute(me) {
    this.move = 1;
    if (me.bullet[0].fired) {
      if (dist(game.player.x + game.player.w/2, game.player.y + game.player.h/2, me.bullet[0].x, me.bullet[0].y) < 20) {
        //gameOver = true;
        me.bullet[0].fired = false; 
        game.player.health--;
      }
      for(var i = 0 ; i < game.balistas.length; i++){
        if (i != me.index) {
          if (game.balistas[i].state == 3){
            if (dist(game.balistas[i].x, game.balistas[i].y, me.bullet[0].x, me.bullet[0].y) < 20){
              me.bullet[0].fired = false;
            }
          }
        }
      }
    }
    // check if the tank is pointing in the same direction
    this.tankAngle = me.angle * (180 / PI);
    if (this.tankAngle >= 180) {
      this.tankAngle = this.tankAngle - 180;
    }
    if (this.bulletAngle >= 180) {
      this.bulletAngle = this.bulletAngle - 180;
    }
    // print(this.tankAngle, this.bulletAngle);
    if (abs(this.bulletAngle - this.tankAngle) <= 80) {
      if (this.bulletAngle > this.tankAngle) {
        me.decreaseAngle(); // if so rotate
        // print("here");
      } else if (this.bulletAngle < this.tankAngle) {
        me.increaseAngle(); // if so rotate
        // print("here2");
      }
    } else {
      // if there is a difference of atleast 45 degrees then just move
      this.velocity.setHeading(me.angle);
      this.velocity.setMag(this.move);
      for (i = 0; i < game.walls.length; i++) {
        if (
          walls[i].checkCollision(
            me.x + this.velocity.x,
            me.y + this.velocity.y
          )
        ) {
          me.increaseAngle();
          this.move = -this.move;
          this.velocity.setMag(this.move);
        }
      }
      for (i = 0; i < game.balistas.length; i++) {
        if (i != me.index) {
          if (
            game.balistas[i].checkCollision(
              me.x + this.velocity.x,
              me.y + this.velocity.y
            )
          ) {
            me.increaseAngle();
            this.move = -this.move;
            this.velocity.setMag(this.move);
          }
        }
      }
      me.x += this.velocity.x;
      me.y += this.velocity.y;
      for (var i = 0; i < 4; i++) {
        if (bullets[i].fired) {
          this.fire[i] = true;
        } else {
          this.fire[i] = false;
        }
      }
      this.noFire = true;
      for (var i = 0; i < 4; i++) {
        if (this.fire[i]) {
          this.noFire = false;
        }
      }
      if (this.noFire) {
        me.state = 0;
      }
    }
        for (var i = 0; i < 4; i++) {
      if (bullets[i].fired) {
        this.bulletAngle = (bullets[i].angle + HALF_PI) * (180 / PI);
        if (dist(me.x, me.y, bullets[i].x, bullets[i].y) < 20) {
          bullets[i].fired = false;
          me.numHits += 1;
          if (me.numHits == 2){
            me.state = 3;
          }
        }
      }
    }
    
  }
}

// When in this state the tank has been destroyed. 
class BalistaDeathState {
  constructor() {
    this.move = 1;
  }
  execute(me) {
    // // draw the fireworks once when the tank dies (Code taken from the class examples)
    // if (me.blast.step == 0) {
    //   me.blast.position.set(me.x, me.y);
    //   me.blast.target.set(me.x, me.y - 50);
    //   me.blast.direction.set(
    //     me.blast.target.x - me.blast.position.x,
    //     me.blast.target.y - me.blast.position.y
    //   );
    //   var s = random(1, 2) / 100;
    //   me.blast.direction.mult(s);
    //   me.blast.step++;
    // } else if (me.blast.step == 1) {
    //   me.blast.draw();
    // } else if (me.blast.step == 2) {
    //   for (var i = 0; i < me.blast.explosions.length; i++) {
    //     me.blast.explosions[i].draw();
    //   }
    //   if (me.blast.explosions[0].timer <= 0) {
    //     me.blast.step++;
    //   }
    // }
    if (me.bullet[0].fired) {
      if (dist(game.player.x + game.player.w / 2, game.player.y + game.player.h / 2, me.bullet[0].x, me.bullet[0].y) < 20) {
        //gameOver = true;
        me.bullet[0].fired = false; 
        game.player.health--;
      }
      for(var i = 0 ; i < game.balistas.length; i++){
        if (i != me.index) {
          if (game.balistas[i].state == 3){
            if (dist(game.balistas[i].x, game.balistas[i].y, me.bullet[0].x, me.bullet[0].y) < 20){
              me.bullet[0].fired = false;
            }
          }
        }
      }
    }
    for (var i = 0; i < 4; i++) {
      if (dist(me.x, me.y, game.arrows[i].x, game.arrows[i].y) < 40) {
        game.arrows[i].fired = false;
        me.state = 3;
      }
    }
    if (!me.dead){
      game.tm.rooms[me.roomNum].numEnemies -= 1;
    }
    me.dead = true; // kill  the tank 
    me.killed(); // draw its destroyed state
    me.fire(); // draw the fire originating from the tank
  }
}

