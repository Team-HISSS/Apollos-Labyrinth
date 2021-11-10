class RoomObj{
  constructor(x,y, neighbors){
    this.x = x; 
    this.y = y; 
    this.neighbors = neighbors;
    this.grid = [
      "wwwwwwwww  wwwwwwwww",
      "w                  w",
      "w                  w",
      "w                  w",
      "w                  w",
      "w                  w",
      "w                  w",
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
      "w                  w",
      "w                  w",
      "wwwwwwwww  wwwwwwwww",
    ]; 

    //adding door locations based on neighbors so character can traverse between rooms. 
    
    //move top room 
    if(this.neighbors[0] == 1){
      this.grid[0] = "wwwwwwwwwddwwwwwwwww";
    }
    else{
      this.grid[0] = "wwwwwwwwwwwwwwwwwwww";
    }
    //move down room 
    if(this.neighbors[1] == 1){
      this.grid[19] = "wwwwwwwwwddwwwwwwwww";
    }
    else{
      this.grid[19] = "wwwwwwwwwwwwwwwwwwww";
    }
    //move left and right room conditions
    if(this.neighbors[2] == 1 && this.neighbors[3] == 1){
      this.grid[9] = "d                  d";
      this.grid[10] = "d                  d";
    }
    else if(this.neighbors[2] == 1 && this.neighbors[3] == 0){
      this.grid[9] = "d                  w";
      this.grid[10] = "d                  w";
    }
    else if(this.neighbors[2] == 0 && this.neighbors[3] == 1){
      this.grid[9] = "w                  d";
      this.grid[10] = "w                  d";
    }
    else{
      this.grid[9] = "w                  w";
      this.grid[10] = "w                  w";
    }

  }  
}
