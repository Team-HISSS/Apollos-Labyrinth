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
      this.arrows = [new ArrowObj(), new ArrowObj(), new ArrowObj()];
      
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
            case "d":
              this.doors.push(new DoorObj(roomOffsetX + j * 20, roomOffsetY +  i * 20));
              break;
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
}
