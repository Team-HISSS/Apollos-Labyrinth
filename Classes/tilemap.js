var harpyGrid = [
  "wwwwwwwww  wwwwwwwww",
  "w                  w",
  "w                  w",
  "w  h             h w",
  "w                  w",
  "w                  w",
  "w        h         w",
  "w                  w",
  "w                  w",
  "                    ",
  "                    ",
  "w                  w",
  "w                  w",
  "w                  w",
  "w         h        w",
  "w                  w",
  "w                  w",
  "w  h             h w",
  "w                  w",
  "wwwwwwwww  wwwwwwwww",
];
var balistaGrid = [
  "wwwwwwwww  wwwwwwwww",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w        b         w",
  "w                  w",
  "w                  w",
  "                    ",
  "                    ",
  "w                  w",
  "w                  w",
  "w                  w",
  "w         b        w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "wwwwwwwww  wwwwwwwww",
];
var playerGrid = [
  "wwwwwwwww  wwwwwwwww",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w        p         w",
  "w                  w",
  "w                  w",
  "                    ",
  "                    ",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w            h     w",
  "w                  w",
  "wwwwwwwww  wwwwwwwww",
];
var bossGrid = [
  "wwwwwwwww  wwwwwwwww",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w        w         w",
  "w                  w",
  "w                  w",
  "                    ",
  "                    ",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w            h     w",
  "w                  w",
  "wwwwwwwww  wwwwwwwww",
];
class Tilemap{
  constructor(width, height, numRooms){
    //construct room grid
    this.width = width;
    this.height = height; 
    this.endRooms = [];
    this.map = new Array(this.width);
    for(var i = 0; i < this.width; i++){
      this.map[i] = new Array(this.height);
    }
    
    for(var i = 0; i < this.width; i++){
      for(var j = 0; j < this.height; j++)
        {
          this.map[i][j] = 0;
          //print(this.map[i][j]);
        }
    }
    //print("num rooms: " + str(numRooms));
    this.numRooms = numRooms;  
    //generate random map 1s and 0s
    this.startX = int(this.width / 2);
    this.startY = int(this.height / 2);

    this.generateMap(this.startX, this.startY, this.numRooms);

    //find neighbors of 1s and 0s
    
    //neighbors = rooms x neighbors array
    this.neighbors = new Array(this.numRooms + 1);
    for(var i = 0; i < this.neighbors.length; i++){
      this.neighbors[i] = [0,0,0,0,0,0];
    }

    //initialize neighbors list
    this.getNeighbors();

    //while(this.getEndRooms.length != 4){
      this.resetMap();
      this.generateMap(this.startX, this.startY, this.numRooms);
      //initialize neighbors list
      this.getNeighbors();
      //print("end rooms: " + this.getEndRooms());
    //}
    //rooms array
    this.rooms = new Array(this.numRooms);

    this.generateRooms();
    
    //hardcode starting players location
    // this.rooms[0].grid[7] = "w   k    p  k    e w";
    // this.rooms[0].grid[3] = "w     s   k   B  s w";
    // this.rooms[0].grid[17]= "wo    a      b     w";
    
  }

  generateMap(x,y, left){
    this.map[x][y] = 1; 
    //generate random direction to choose from
    var direction = int(random(0, 4))

    if(left < 1){
      return 1
    }
    //up
    if (direction == 0){
      if (y - 1 >= 0){
        if (this.map[x][y-1] == 1){
          this.generateMap(x, y-1, left);
        }
        else{
          left = left -1 
          this.generateMap(x, y-1, left);
        }
      }
      else{
        this.generateMap(x, y, left);
      }
    }
    //down
    else if (direction == 1){
      if(y+1 < this.height){
        if (this.map[x][y+1] == 1){
          this.generateMap(x, y+1, left);
        }
        else{
          left = left - 1
          this.generateMap(x, y+1, left);
        }

      }
      else{
        this.generateMap(x, y, left);
      }
    }
    //left
    else if(direction == 2){
      if (x-1 >= 0){
        if (this.map[x-1][y] == 1){
          this.generateMap(x-1, y, left);
        }
        else {
          left = left -1
          this.generateMap(x-1, y, left);
        }
      }
      else{
        this.generateMap(x, y, left);
      }
    }
    //right
    else if (direction == 3){
      if(x+1 < this.width){
        if (this.map[x+1][y] == 1){
          this.generateMap(x+1, y, left);
        }
        else {
          left = left -1 
          this.generateMap(x+1, y, left);
        }
      }
      else{
        this.generateMap(x, y, left);
      }
    }

  }
  printMap(rx, ry){
    for(var i = 0; i < this.width; i++){
      for(var j = 0; j < this.height; j++){
        if(this.map[i][j] == 1){
          push();
          fill(255,0,0);
          ellipse(i*20 + 200, j*20 + 200, 20,20);
          pop();
          if(i == rx && j == ry){
            push();
              fill(0,255,0);
              ellipse(i*20 + 200, j*20 + 200, 20,20);
            pop();
          }
        }
        else {
          push();
          fill(0);
          ellipse(i*20+200, j*20+200, 20, 20);
          pop();
        }
      }
    }
  }
  
  getNeighbors(){
    var k = 0;
    for (var x = 0 ; x < this.width; x++){
      for (var y = 0; y < this.height; y++){
        //print(this.map[x][y]);
        
        if (this.map[x][y] == 1) {
          //x y coordinates stored in neighbors array
          // print("X " + str(x));
          // print("K " + str(k));
          // print("Length: " + str(this.neighbors.length));

          this.neighbors[k][4] = x; 
          this.neighbors[k][5] = y;

          //up neighbor
          if(y - 1 >= 0){
            if(this.map[x][y- 1] == 1){
              this.neighbors[k][0] = 1; 
            }
          }
          //down neighbor
          if(y + 1 < this.height){
            if(this.map[x][y + 1] == 1){
              this.neighbors[k][1] = 1; 
            }
          }
          //left neighbor
          if(x - 1 >= 0){
            if(this.map[x - 1][y] == 1){
              this.neighbors[k][2] = 1; 
            }
          }
          //right neighbor
          if(x + 1 < this.width){
            if(this.map[x + 1][y] == 1){
              this.neighbors[k][3] = 1; 
            }
          }
          k += 1;
        }
      }
    }
  }

  generateRooms(){
    this.endRooms = [];
    for(var i = 0; i < this.neighbors.length; i++){
      //x,y, 0-4 is all neighbors
      this.rooms[i] = new RoomObj(this.neighbors[i][4], this.neighbors[i][5], [this.neighbors[i][0], this.neighbors[i][1], this.neighbors[i][2], this.neighbors[i][3]], i);
    }
    for(var i = 0; i < this.rooms.length; i++){
      
      if (this.rooms[i].numNeighbors == 1){
        // print("Here");
        this.endRooms.push(this.rooms[i])
      }
    }
    // print(endRooms.length);
    if (this.endRooms.length != 3){
      for (var i = 0; i < this.neighbors.length; i++){
        this.rooms[i] = 0;
      }

      this.resetMap();
      
      this.startX = int(this.width / 2);
      this.startY = int(this.height / 2);
      this.generateMap(this.startX, this.startY, this.numRooms);
      this.getNeighbors();
      this.generateRooms();
    }
    for (var i = 0; i < this.endRooms.length; i++){
      this.endRooms[i].endRoom = true
    }


  }

  //return array of locations of all end rooms
  findEndRooms(){
    var endRoomsList = [];
    for(var i = 0; i < this.rooms.length; i++){
      if(this.rooms[i].isEndRoom){
        endRoomsList.push(i);
      }
    }
    return endRoomsList; 
  }

  resetMap(){
    for(var x = 0; x < this.width; x++){
      for(var y = 0; y < this.height; y++){
        this.map[x][y] = 0; 
      }
    }

    for(var i = 0; i < this.neighbors.length; i++){
      this.neighbors[i] = [0,0,0,0,0,0];
    }
    // getEndRooms(){
      
    // }

  }

}