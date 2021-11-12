class WallObj{
    constructor(x,y){
      this.x = x;
      this.y = y; 
      this.size = 20;
    }
    draw(){
    
      image(wall1, this.x, this.y, 20, 20);
    }
    
}

class DoorObj{
  constructor(x,y, id, location){

    this.roomNumber = id;
    this.location = location;
    this.x = x;
    this.y = y; 
    this.size = 20;
    this.open = false;
    this.cameFrom = false;
  }
  draw(){

    image(door, this.x, this.y, 20, 20);

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
    