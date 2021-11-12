class RoomObj{
  constructor(x,y, neighbors, num){
    this.roomNumber = num;
    this.x = x; 
    this.y = y;
    this.numEnemies = 0;
    this.doorsOpen = [];
    this.neighbors = neighbors; 
    this.grid = [
      "wwwwwwwww  wwwwwwwww",
      "w                  w",
      "w                  w",
      "w  s               w",
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
      "w              h   w",
      "w                  w",
      "w                  w",
      "wwwwwwwww  wwwwwwwww",
    ]; 

    //adding door locations based on neighbors so character can traverse between rooms. 
    
    //move top room 
    if(this.neighbors[0] == 1){
      this.grid[0] = "wwwwwwwwwttwwwwwwwww";
      // this.doorsOpen.append(false);
    }
    else{
      this.grid[0] = "wwwwwwwwwwwwwwwwwwww";
      // this.doorsOpen.append(-1);
    }
    //move down room 
    if(this.neighbors[1] == 1){
      this.grid[19] = "wwwwwwwwwbbwwwwwwwww";
      // this.doorsOpen.append(false);
    }
    else{
      this.grid[19] = "wwwwwwwwwwwwwwwwwwww";
      // this.doorsOpen.append(-1);

    }
    //move left and right room conditions
    if(this.neighbors[2] == 1 && this.neighbors[3] == 1){
      this.grid[9] = "l                  r";
      this.grid[10] = "l                  r";
      // this.doorsOpen.append(false);
      // this.doorsOpen.append(false);
    }
    else if(this.neighbors[2] == 1 && this.neighbors[3] == 0){
      this.grid[9] = "l                  w";
      this.grid[10] = "l                  w";
      // this.doorsOpen.append(false);
      // this.doorsOpen.append(-1);

    }
    else if(this.neighbors[2] == 0 && this.neighbors[3] == 1){
      this.grid[9] = "w                  r";
      this.grid[10] = "w                  r";
      // this.doorsOpen.append(-1);
      // this.doorsOpen.append(false);
    }
    else{
      this.grid[9] = "w                  w";
      this.grid[10] = "w                  w";
      // this.doorsOpen.append(-1);
    }
    
  }
  setNumEnemies(num){
    this.numEnemies = num;
  }
  isEndRoom(){
    var counter = 0; 
    for(var i = 0; i < this.neighbors.length; i++){
      if(this.neighbors[i] == 1){
        counter++; 
      }
    }
    var isEnd = false;
    if(counter <= 1){
      isEnd = true;
    }
    return isEnd; 
  }

}
