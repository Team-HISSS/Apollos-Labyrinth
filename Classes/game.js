// Creates the Game Object class containing the tilemap
class GameObj {
    //Game object class
    constructor() {
      //private members of game
      this.screen = 0;
      this.player = 0;
      this.walls = [];
      this.harpies = [];
      this.doors = [];
      this.snakes = [];
      this.tiles = [];
      
      //Tilemap class instance. Contains a large map full of Room objects
      this.tm = new Tilemap(6,6, int(random(10,20)));
      this.currRoom = 0;
    }
    //initially draw tile map onto canvas
  initializeTileMap() {
    for(var k = 0; k < this.tm.rooms.length; k++){
      //offset room location on entire map
      var roomOffsetX = this.tm.rooms[k].x * 400;
      var roomOffsetY = this.tm.rooms[k].y * 400;
      var numEnemies = 0;
      for(var i = 0; i < this.tm.rooms[k].grid.length; i++){
        for(var j = 0; j < this.tm.rooms[k].grid[0].length; j++){
          switch (this.tm.rooms[k].grid[i][j]) {
            case "w":              
              this.walls.push(new WallObj(roomOffsetX + 20 * j, roomOffsetY + 20 * i));
              break;
            case "p":
              this.player = (new ArcherObj(roomOffsetX +j * 20, roomOffsetY +i * 20, this.tm.rooms[k].x, this.tm.rooms[k].y, k, this.tm.rooms));
              break;
            case "h":
              this.harpies.push(new HarpyObj(roomOffsetX + j * 20, roomOffsetY + i * 20, this.tm.rooms[k].x, this.tm.rooms[k].y, k));
              numEnemies += 1;
              break;
            case "t":
              this.doors.push(new DoorObj(roomOffsetX + j * 20, roomOffsetY +  i * 20, k, 0));
              break;
            case "b":
              this.doors.push(new DoorObj(roomOffsetX + j * 20, roomOffsetY +  i * 20, k, 1));
            case "l":
              this.doors.push(new DoorObj(roomOffsetX + j * 20, roomOffsetY +  i * 20, k, 2));
            case "r":
              this.doors.push(new DoorObj(roomOffsetX + j * 20, roomOffsetY +  i * 20, k, 3));
            case "s":
              this.snakes.push(new SnakeObj(roomOffsetX + j * 20,roomOffsetY + i * 20));
              break;
          }
          if(this.tm.rooms[k].grid[i][j] != "w" && this.tm.rooms[k].grid[i][j] != "d")
          //square tile floor 
          this.tiles.push(new p5.Vector(roomOffsetX + j * 20, roomOffsetY + i * 20));
        } 
      }
      this.tm.rooms[k].setNumEnemies(numEnemies);
    }
  }
  // updateNeighborDoor(){
    
  //   for(var i = 0; i < this.tm.rooms.length; i++){
  //     var neighborid = []
  //     if (this.tm.rooms[i].neighbors[0] == 1){
  //       for(var k = 0; k < this.tm.rooms.length; k++){
  //         if (this.tm.rooms[i].x == this.tm.rooms[k].x && this.tm.rooms[i].y -1 == this.tm.rooms[k].y ){
  //           neighborid.append(this.rooms[k].roomNumber);
  //         } 
  //       }
  //       // neighbor.append(0);
  //     }
  //     else{
  //       neighborId.append(-1);
  //     }
  //     if (this.tm.rooms[i].neighbors[1] == 1){ // Down
  //       for(var k = 0; k < this.tm.rooms.length; k++){
  //         if (this.tm.rooms[i].x == this.tm.rooms[k].x && this.tm.rooms[i].y + 1 == this.tm.rooms[k].y ){
  //           neighborid.append(this.rooms[k].roomNumber);
  //         } 
  //       }
  //       // neighborId.append(1);
  //     }
  //     else{
  //       neighborId.append(-1);
  //     }
  //     if (this.tm.rooms[i].neighbors[2] == 1){
  //       for(var k = 0; k < this.tm.rooms.length; k++){
  //         if (this.tm.rooms[i].x -1 == this.tm.rooms[k].x  && this.tm.rooms[i].y == this.tm.rooms[k].y){
  //           neighborid.append(this.rooms[k].roomNumber);
  //         } 
  //       }
  //       // neighborId.append(2);
  //     }
  //     else{
  //       neighborId.append(-1);
  //     }
  //     if (this.tm.rooms[i].neighbors[3] == 1){
  //       for(var k = 0; k < this.tm.rooms.length; k++){
  //         if (this.tm.rooms[i].x + 1 == this.tm.rooms[k].x  && this.tm.rooms[i].y == this.tm.rooms[k].y){
  //           neighborid.append(this.rooms[k].roomNumber);
  //         } 
  //       }
  //       // neighborId.append(3);
  //     }
  //     else{
  //       neighborId.append(-1);
  //     }
  //     for (var j = 0; j < this.doors.length; i++){
  //       if (this.doors[i].roomNumber == this.tm.rooms[i].roomNumber){
  //         if (this.doors[i].open){
  //           if (this.doors[i].location == 0){
  //             this.tm.rooms[i].doorsOpen[0] = true;
  //           }
  //           if (this.doors[i].location == 1){
  //             this.tm.rooms[i].doorsOpen[1] = true;
  //           }
  //           if (this.doors[i].location == 2){
  //             this.tm.rooms[i].doorsOpen[2] = true;
  //           }
  //           if (this.doors[i].location == 3){
  //             this.tm.rooms[i].doorsOpen[3] = true;
  //           }
  //         }
  //       }
  //     }
      
  //     if (this.tm.rooms[i].doorsOpen[0]){
  //       this.tm.rooms[neighborid[0]].doorsOpen[1] = true;
  //     }
  //     if (this.tm.rooms[i].doorsOpen[1]){
  //       this.tm.rooms[neighborid[1]].doorsOpen[0] = true;
  //     }
  //     if (this.tm.rooms[i].doorsOpen[2]){
  //       this.tm.rooms[neighborid[2]].doorsOpen[3] = true;
  //     }
  //     if (this.tm.rooms[i].doorsOpen[3]){
  //       this.tm.rooms[neighborid[3]].doorsOpen[2] = true;
  //     }
  //     // for(var j = 0; j < neighborid.length; j++){
  //       if(this.tm.rooms[neighborid[0]].doorsOpen[1]){
  //         for (var k = 0; k < this.doors.length; k++){
  //           if (this.doors.id = this.neighborid[0]){
  //             if (this.doors[k].location == 1){
  //               this.doors[k].open =true;
  //             }
  //           }
  //         }
  //       }
  //       if(this.tm.rooms[neighborid[1]].doorsOpen[0]){
  //         for (var k = 0; k < this.doors.length; k++){
  //           if (this.doors.id = this.neighborid[1]){
  //             if (this.doors[k].location == 0){
  //               this.doors[k].open = true;
  //             }
  //           }
  //         }
  //       }
  //       if(this.tm.rooms[neighborid[2]].doorsOpen[3]){
  //         for (var k = 0; k < this.doors.length; k++){
  //           if (this.doors.id = this.neighborid[2]){
  //             if (this.doors[k].location == 3){
  //               this.doors[k].open = true;
  //             }
  //           }
  //         }
  //       }
  //       if(this.tm.rooms[neighborid[3]].doorsOpen[2]){
  //         for (var k = 0; k < this.doors.length; k++){
  //           if (this.doors.id = this.neighborid[3]){
  //             if (this.doors[k].location ==2){
  //               this.doors[k].open = true;
  //             }
  //           }
  //         }
  //       }
  //     // }


  //   }
  // }
}
