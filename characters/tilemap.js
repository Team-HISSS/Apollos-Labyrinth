class Tilemap{
  constructor(width, height, numRooms){
    //construct room grid
    this.width = width;
    this.height = height;
    this.map = new Array(width);
    for(var i = 0; i < this.map.length; i++){
      this.map[i] = new Array(height);
    }

    this.numRooms = numRooms;  
    //generate random map 1s and 0s
    this.generateMap(this.width, this.height, this.numRooms);
    
    //find neighbors of 1s and 0s

    //neighbors = rooms x neighbors array
    this.neighbors = new Array(this.numRooms);
    for(var i = 0; i < this.numRooms; i++){
      this.neighbors[i] = new Array(6);
    }

    for (var i = 0; i < this.numRooms; i++){
      for(var j = 0; j < 6; j++){
        this.neighbors[i][j] = 0;
      }
    }
    //initialize neighbors list
    this.getNeighbors();

    //rooms array
    this.rooms = new Array(this.numRooms);

    this.generateRooms();
    
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
        if (this.map[x-1][y] ==1){
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
  printMap(){
    for(var i = 0; i < this.width; i++){
      for(var j = 0; j < this.height; j++){
        if(this.map[i][j] == 1){
          push();
          fill(255,0,0);
          ellipse(i*20 + 200, j*20 + 200, 20,20);
          pop();
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
        if (this.map[x][y] == 1){
          //x y coordinates stored in neighbors array
          this.neighbors[k][4] = x; 
          this.neighbors[k][5] = y; 

          //up neighbor
          if(y - 1 >= 0){
            if(this.map[x][y- 1] == 1){
              this.neighbors[k][0] = 1; 
            }
          }
          //down neighbor
          else if(y + 1 < this.height){
            if(this.map[x][y + 1] == 1){
              this.neighbors[k][1] = 1; 
            }
          }
          //left neighbor
          else if(x - 1 >= 0){
            if(this.map[x - 1][y] == 1){
              this.neighbors[k][2] = 1; 
            }
          }
          //right neighbor
          else if(x + 1 > this.width){
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
    for(var i = 0; x < this.neighbors.length; i++){
      this.rooms[i] = new RoomObj(this.neighbors[i][4], this.neighbors[i][5], [this.neighbors[i][0], this.neighbors[i][1], this.neighbors[i][2], this.neighbors[i][3]]);
    }
  }
}
