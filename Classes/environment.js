class WallObj{
    constructor(x,y){
      this.x = x;
      this.y = y;
      this.cx = this.x + 10; 
      this.cy = this.y + 10;  
      this.size = 20;
    }
    draw(){
    
      image(wall1, this.x, this.y, 20, 20);
    }
    checkCollision(x, y) {
      // if the distance between there x and y values is less than 15 a collision is detected
      if (abs(x - this.cx) < 20 && abs(y - this.cy) < 25) {
        return true;
      } else {
        return false;
      }
    }

    checkCollisionB(x, y) {
      if (abs(x - this.cx) < 17.5 && abs(y - this.cy) < 17.5) {
        return true;
      } else {
        return false;
      }
    }
    
}

class DoorObj{
  constructor(x,y, id, location){

    this.roomNumber = id;
    this.location = location;
    this.x = x;
    this.y = y; 
    this.cx = this.x - 10; 
    this.cy = this.y - 10; 
    this.size = 20;
    this.open = false;
    this.cameFrom = false;
  }
  draw(){
    image(door, this.x, this.y, 20, 20);
  }
  checkCollisionB(x, y) {
    if (abs(x - this.cx) < 17.5 && abs(y - this.cy) < 17.5) {
      return true;
    } else {
      return false;
    }
  }

}

class FloorObj{
  constructor(x,y){
    this.x = x;
    this.y = y; 
  }
  draw(){
    image(tileSquare, this.x, this.y, 20, 20);
  }
}

class EasterEgg{
  constructor(x, y, index, w=20, h=20){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.index = index;
    this.size = 20;
    this.taken = false;
  }
  draw(){
    image(easterEggCapture[this.index], this.x, this.y, this.w, this.h);
  }
}
    


class KeyObj{
  constructor(x,y, rx, ry, roomNum){
    this.x = x; 
    this.y = y; 
    this.rx = rx; 
    this.ry = ry; 
    this.roomNum = roomNum;
    this.collected = false; 
  }
  draw(){
    if(dist(game.player.x + game.player.w/2 , game.player.y + game.player.h/2, this.x, this.y) < 40){
      this.collected = true; 
    }
    push();
    if(!this.collected){
      image(keyImage, this.x - 25, this.y - 25, 50, 50);
    }
    pop();
  }
}



//clouds move across screen once the program goes into the sky
class CloudObj {
  //base x and y coordinate for the rectangle
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    //white
    fill(255, 255, 255);
    noStroke();
    //base rectangle of cloud
    rect(this.x, this.y, 75, 40);
    //top semicircles part of cloud
    arc(this.x + 10, this.y, 25, 25, PI, 0);
    arc(this.x + 25, this.y, 40, 40, PI, 0);
    arc(this.x + 45, this.y, 30, 35, PI, 0);
    arc(this.x + 65, this.y, 25, 25, PI, 0);
    //left semicircles of cloud
    arc(this.x, this.y + 5, 25, 25, PI / 2, (3 * PI) / 2);
    arc(this.x, this.y + 25, 30, 30, PI / 2, (3 * PI) / 2);
    //bottom semicircles of cloud
    arc(this.x + 10, this.y + 40, 25, 25, 0, PI);
    arc(this.x + 30, this.y + 40, 25, 25, 0, PI);
    arc(this.x + 45, this.y + 40, 25, 25, 0, PI);
    arc(this.x + 65, this.y + 40, 25, 25, 0, PI);
    //right semicircles of cloud
    arc(this.x + 75, this.y + 5, 25, 25, (3 * PI) / 2, PI / 2);
    arc(this.x + 75, this.y + 25, 30, 30, (3 * PI) / 2, PI / 2);
  }
  //makes cloud continously move left to right across the screen
  move() {
    this.x += 1;
    //once cloud is off screen it reappears again on left side
    if (this.x > 450) {
      this.x = -100;
    }
  }
}