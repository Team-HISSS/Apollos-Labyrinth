class GameObj {
  //Game object class
  constructor() {
    //tilemap array
    this.tileMap = [];
    
    //private members of game
    this.screen = 0;
  }
}

//if mouse is clicked in main menu
function mouseClicked() {
  var x = mouseX;
  var y = mouseY;

  //start game is pressed to start the game screen
  if (game.screen == 0) {
    if (x >= 135 && x <= 275 && y >= 85 && y <= 120) {
      game.screen = 2;
    }
    //rules are pressed to go to rules screen
    if (x >= 140 && x <= 275 && y >= 345 && y <= 380) {
      game.screen = 1;
    }
  }
  //back arrow in rules screen goes to main screen
  if (game.screen == 1) {
    if (x >= 5 && x <= 80 && y >= 10 && y <= 52) {
      game.screen = 0;
    }
  }
}

//public variables
var game = new GameObj();

function setup() {
  createCanvas(400, 400);
  
}

function draw() {
  background(220);
  //starting screen for game
  if(game.screen == 0){
    //Title
    text("Apollo's Labyrinth", 65, 50);
    
    //rect around start
    stroke(0);
    text("START", 150, 115);
    
    fill(238, 50, 51);
    textSize(20);
    text("Click rules to learn to play:", 85, 335);
    textSize(35);
    text("RULES", 150, 375);
    
    noFill();
    //rect around start
    rect(140, 345, 135, 35);
    //rect around rules
    rect(135, 85, 140, 35);
  }
  
  //instructuions screen
  else if(game.screen == 1){
    
    fill(0, 0, 0);
    textSize(30);
    text("Rules:", 50, 150);
    textSize(20);
    text("-Move with WSAD.", 50, 180);
    text("-Shoot with the arrow keys.", 50, 200);
    text("-Avoid enemies and their projectiles.", 50, 220);
    text("-Kill all enemies in a room to move on.", 50, 240);
    text("-Conquer each of the rooms.", 50, 260);
    text("Collect all 3 keys to win.", 50, 280);
    text("Click the arrow to go the to main menu.", 25, 320);

    //back arrow
    textSize(50);
    rect(30, 25, 35, 15);
    triangle(30, 20, 30, 45, 10, 32);
    noFill();
    rect(5, 10, 70, 42);
    
    
  }
  
}