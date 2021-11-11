class WallObj{
    constructor(x,y, rx, ry){
      this.rx = rx;
      this.ry = ry;
      this.x = x;
      this.y = y; 
    }
    draw(){
      var translatex = this.rx*400;
      var translatey = this.ry*400;
      push();
      translate(translatex, translatey);
      image(wall1, this.x, this.y, 20, 20);
      pop();
    }
    }
    
    class DoorObj{
    constructor(x,y, rx, ry){
      this.rx = rx;
      this.ry = ry;
      this.x = x;
      this.y = y; 
    }
    draw(){
      var translatex = this.rx*400;
      var translatey = this.ry*400;
      push();
      translate(translatex, translatey);
      image(door, this.x, this.y, 20, 20);
      pop();
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
    