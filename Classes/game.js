// Creates the Game Object class containing the tilemap
var enemyDict = ["h", "s"];
var genGrid = [
  "wwwwwwwww  wwwwwwwww",
  "w                 Pw",
  "w                  w",
  "w  e             e w",
  "w                  w",
  "w                  w",
  "w        e         w",
  "w                  w",
  "w                  w",
  "                    ",
  "                    ",
  "w                  w",
  "w                  w",
  "w                  w",
  "w         e        w",
  "w                  w",
  "w                  w",
  "w  e             e w",
  "wH                 w",
  "wwwwwwwww  wwwwwwwww",
];
//3 6 14 17

class GameObj {
    //Game object class
    constructor(numberRooms) {
      //private members of game
      this.screen = 0;
      this.player = 0;
      this.walls = [];
      this.harpies = [];
      this.balistas = [];
      this.doors = [];
      this.snakes = [];
      this.tiles = [];
      this.arrows = [new ArrowObj(), new ArrowObj(), new ArrowObj(), new ArrowObj(), new ArrowObj(), new ArrowObj(), new ArrowObj(), new ArrowObj()];
      this.easterEggs = [];
      this.hydras = [];
      this.keys = [];
      this.playingRooms = numberRooms; 
      
      //Tilemap class instance. Contains a large map full of Room objects
      this.tm = new Tilemap(6,6, this.playingRooms);
      this.currRoom = 0;
    }
    setRooms(){
      var setplayer = false;
      var setHarpy = false;
      var setBalista = false;
      var setBalHarp = false;
      var setSnake = false;
      var setSnakeHar = false;

      for (var i = 0; i < this.tm.rooms.length; i++){
        if (!this.tm.rooms[i].endRoom && !setplayer){
          //print("Here2");
          this.tm.rooms[i].grid[8] = "w        p         w";
          setplayer = true;
        }
        else if (!this.tm.rooms[i].endRoom && !setHarpy){
          this.tm.rooms[i].grid[3] = "w  h     h       h w";
          this.tm.rooms[i].grid[6] = "w        h         w";
          this.tm.rooms[i].grid[14] = "w        h         w";
          this.tm.rooms[i].grid[17] = "wo h             h w";
          setHarpy = true;
        }
        else if(!this.tm.rooms[i].endRoom && !setBalista){
          this.tm.rooms[i].grid[3] = "w  q            q  w";
          this.tm.rooms[i].grid[6] = "w                  w";
          this.tm.rooms[i].grid[14] = "w          q       w";
          this.tm.rooms[i].grid[17] = "wa      q      q   w";
          setBalista = true;
        }
        else if(!this.tm.rooms[i].endRoom && !setBalHarp){
          this.tm.rooms[i].grid[3] = "w  h             h w";
          this.tm.rooms[i].grid[6] = "w        h  h      w";
          this.tm.rooms[i].grid[14] = "w                  w";
          this.tm.rooms[i].grid[17] = "w  q            q  w";
          setBalHarp = true;
        }
        else if(!this.tm.rooms[i].endRoom && !setSnake){
          this.tm.rooms[i].grid[3] = "w as             s w";
          this.tm.rooms[i].grid[6] = "w        s  s      w";
          this.tm.rooms[i].grid[14] = "w       s  s       w";
          this.tm.rooms[i].grid[17] = "w  s            s ow";
          setSnake = true;
        }
        else if (!this.tm.rooms[i].endRoom && !setSnakeHar){
          this.tm.rooms[i].grid[3] = "w as             s w";
          this.tm.rooms[i].grid[6] = "w      h s  h      w";
          this.tm.rooms[i].grid[14] = "w     s h  s       w";
          this.tm.rooms[i].grid[17] = "w  h            h  w";
          setSnakeHar = true;
        }
        else if (!this.tm.rooms[i].endRoom){
          this.tm.rooms[i].grid[3] = "w aq             s w";
          this.tm.rooms[i].grid[6] = "w      h q  h      w";
          this.tm.rooms[i].grid[14] = "w     s h  s       w";
          this.tm.rooms[i].grid[17] = "w  h            q ow";
          setHarpy = false;
          setBalista = false;
          setSnake = false;
          setBalHarp = false;
          setSnakeHar = false;
        }
        if (this.tm.rooms[i].endRoom){
          this.tm.rooms[i].grid[8] = "wo       Bk        w";
          this.tm.rooms[i].grid[18] = "w                 aw";
        }
      }
      
    }
    //initially draw tile map onto canvas
  initializeTileMap() {
    var enemyIndex = 0;
    
    this.setRooms();
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
              //print("here archer");
              this.player = (new ArcherObj(roomOffsetX +j * 20, roomOffsetY +i * 20, this.tm.rooms[k].x, this.tm.rooms[k].y, k, this.tm.rooms));
              break;
            case "h":
              this.harpies.push(new HarpyObj(roomOffsetX + j * 20, roomOffsetY + i * 20, this.tm.rooms[k].x, this.tm.rooms[k].y, k));
              numEnemies += 1;
              break;
            case "B":
              // print("Hydra created");
              // this.hydra = new Hydra(roomOffsetX + j * 20, roomOffsetY + i * 20, this.tm.rooms[k].x, this.tm.rooms[k].y, k);
              // numEnemies+=1;
              this.hydras.push(new Hydra(roomOffsetX + j * 20, roomOffsetY + i * 20, this.tm.rooms[k].x, this.tm.rooms[k].y, k));
              numEnemies += 1;
              break;
            case "q":
              //print("HERE b object detected");
              this.balistas.push(new BalistaObj(roomOffsetX + j * 20 , roomOffsetY + j*20, this.tm.rooms[k].x, this.tm.rooms[k].y, enemyIndex, k));
              enemyIndex++;
              numEnemies += 1;
              break;
            case "s":
              //print(this.tm.rooms[k].x);
              this.snakes.push(new SnakeObj(roomOffsetX + j * 20, roomOffsetY + i * 20, this.tm.rooms[k].x, this.tm.rooms[k].y));
              // numEnemies++; 
              break;
            case "t":
              this.doors.push(new DoorObj(roomOffsetX + j * 20, roomOffsetY +  i * 20, k, 0));
              break;
            case "b":
              this.doors.push(new DoorObj(roomOffsetX + j * 20, roomOffsetY +  i * 20, k, 1));
              break;
            case "l":
              this.doors.push(new DoorObj(roomOffsetX + j * 20, roomOffsetY +  i * 20, k, 2));
              break;
            case "r":
              this.doors.push(new DoorObj(roomOffsetX + j * 20, roomOffsetY +  i * 20, k, 3));
              break;
            case "a":
              // Health boost - easter egg
              this.easterEggs.push(new EasterEgg(roomOffsetX + j*20, roomOffsetY + i*20, 1));
              break;
            case "k":
                // Keys - easter egg
                // print("HERE - KEYS detected"); 
                this.keys.push(new KeyObj(roomOffsetX + j*20, roomOffsetY + i*20, this.tm.rooms[k].x, this.tm.rooms[k].y, k));
                break;
            case "e":
              // Cataclyst - easter egg for developers only!
              this.easterEggs.push(new EasterEgg(roomOffsetX + j*20, roomOffsetY + i*20, 0));
              break;
            case "o":
              // Power boost - easter egg
              this.easterEggs.push(new EasterEgg(roomOffsetX + j*20, roomOffsetY + i*20, 2, 13.33, 25));
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
