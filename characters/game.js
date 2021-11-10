// Creates the Game Object class containing the tilemap
class GameObj {
    //Game object class
    constructor() {
        //tilemap array
            this.tileMap = [
      "wwwwwwwwwddwwwwwwwww",
      "w                  w",
      "w                  w",
      "w                  w",
      "w                  w",
      "w                  w",
      "w                  w",
      "w                  w",
      "w                  w",
      "d        h         d",
      "d                  d",
      "w                  w",
      "w                  w",
      "w                  w",
      "w                  w",
      "w                  w",
      "w                  w",
      "w                  w",
      "w         p        w",
      "wwwwwwwwwddwwwwwwwww",
    ];
      
      //private members of game
      this.screen = 0;
      this.player = 0;
      this.walls = [];
      this.harpies = [];
      this.doors = [];
    }
    //initially draw tile map onto canvas
  initializeTileMap() {
    //background for tile map is brown
    background(139, 69, 19);
  
    //nested loop through the tile map
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 60; j++) {
        //determines which character to draw from tilemap
        switch (this.tileMap[i][j]) {
          case "w":
            this.walls.push(new WallObj(20 * j, 20 * i));
            break;
          case "p":
            this.player = (new ArcherObj(archerRight, 'r', j * 20, i * 20));
            break;
  
          case "h":
            this.harpies.push(new HarpyObj(j * 20, i * 20, this.enemyNum));
            break;
          case "d":
            this.doors.push(new DoorObj(j * 20, i * 20, this.enemyNum));
            break;
        }
      }
    }
  }
}