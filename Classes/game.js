// Creates the Game Object class containing the tilemap
class GameObj {
    //Game object class
    constructor() {
      this.tileMap = [
        "wwwwwwwwwwwwwwwwwwww",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w                  w",
        "w        s         w",
        "w                  w",
        "w         h        w",
        "w                  w",
        "w                  w",
        "wwwwwwwwwwwwwwwwwwww",
      ];
      //Tilemap class instance. Contains a large map full of Room objects
      this.map = new Tilemap(6,6, int(random(4,7)));
      //private members of game
      this.screen = 0;
      this.player = 0;
      this.walls = [];
      this.harpies = [];
      this.doors = [];
      this.snakes = [];
    }
    //initially draw tile map onto canvas
  initializeTileMap() {
    //background for tile map is brown
    background(139, 69, 19);
  
    //nested loop through the tile map
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        //determines which character to draw from tilemap
        switch (this.tileMap[i][j]) {
          case "w":
            this.walls.push(new WallObj(20 * j, 20 * i));
            break;
          case "p":
            this.player = (new ArcherObj(archerRight, 'r', j * 20, i * 20));
            break;
  
          case "h":
            this.harpies.push(new HarpyObj(j * 20, i * 20));
            break;
          case "d":
            this.doors.push(new DoorObj(j * 20, i * 20));
            break;
          case "d":
            this.snakes.push(new SnakeObj(j * 20, i * 20));
            break;
        }
      }
    }
  }
}
