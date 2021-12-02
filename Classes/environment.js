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