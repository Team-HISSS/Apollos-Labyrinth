class GameObj {
  //Game object class
  constructor() {
    //tilemap array
    this.tileMap = [];
    
    //private members of game
    this.screen = 0;
  }
}

class explosionObj {
  constructor(a) {
    this.position = new p5.Vector(0, 0);
    this.direction = new p5.Vector(0, 0);
    this.size = random(1, 3);
    if (a === 0) {
        this.c1 = random(0, 250);
    }
    else {
        this.c1 = random(100, 255);
    }
    if (a === 1) {
        this.c2 = random(0, 250);
    }
    else {
        this.c2 = random(100, 255);
    }
    if (a === 3) {
        this.c3 = random(0, 250);
    }
    else {
        this.c3 = random(100, 255);
    }
    this.timer = 0;
  }
  
  //// EXPERIMENT direction of explosion /////
  draw() {
    fill(this.c1, this.c2, this.c3, this.timer);        // 4th value fader
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);

    this.position.x += this.direction.y*cos(this.direction.x);
    this.position.y += this.direction.y*sin(this.direction.x);
/*  this.position.add(this.direction); // random cartesian direction */
    this.position.y += (90/(this.timer + 100));    //gravity
    this.timer--;
  }
}

///// EXPERIMENT number of particles ////
class fireworkObj {
  constructor(a) {
    this.position = new p5.Vector(200, 380);
    this.direction = new p5.Vector(0, 0);
    this.target = new p5.Vector(mouseX, mouseY);
    this.step = 0;
    this.explosions = [];
    for (var i = 0; i < 200; i++) {
        this.explosions.push(new explosionObj(a));
    }
  }
  
  //// EXPERIMENT direction of explosion /////
  draw() {
    fill(255, 255, 255);
    noStroke();
    ellipse(this.position.x, this.position.y, 2, 2);

    this.position.add(this.direction);
    if (dist(this.position.x, this.position.y, this.target.x, this.target.y) < 4) {
        this.step = 2;
        for (var i = 0; i < this.explosions.length; i++) {
            this.explosions[i].position.set(this.target.x, this.target.y);

            this.explosions[i].direction.set(random(0, 360), random(-0.3, 0.3));
/*          this.explosions[i].direction.set(random(-0.3, 0.3),
                random(-0.3, 0.3)); // cartesian (instead of polar) direction */
            this.explosions[i].timer = 180;
        }
    }
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
    if (x >= 90 && x <= 160 && y >= 10 && y <= 52) {
      game.screen = 0;
    }
  }
}

//public variables
var game = new GameObj();
var startScreenGreen = 0; 
var firework; 
let startSong, mapSong, bossSong;
let parthenon; 

function preload(){
  startSong = loadSound("./dark-forest.mp3", loaded);
  parthenon = loadImage('parthenon.png');
}

function loaded(){
  startSong.loop();
}
function setup() {
  createCanvas(400, 400);
  //startSong = loadSound('assets/dark-forest.mp3');
  firework = [new fireworkObj(0), new fireworkObj(1), new fireworkObj(2), new fireworkObj(0)];
}

function draw() {
  
  background(255, 0 , 0);
  //starting screen for game
  if(game.screen == 0){
    
    //sky
    fill(135,206,235);
    rect(0,0, 400, 400);
    
    //sun
    fill(255,100, 0);
    ellipse(0,0, 100, 100);
    
    //hill
    fill(0,51,0);
    ellipse(200, 400, 700, 200);
    
    //pillars for parthenon
    fill(255);
    rect(25, 250, 10, 75);
    rect(375, 250, 10, 75);
    
    startScreenGreen += 0.5; 
    if(startScreenGreen >= 165)
    {
      startScreenGreen = 0; 
      //fireball explosions
    }
    
    
    image(parthenon, 0,0);
    
    //Title
    fill(255, startScreenGreen, 0);
    stroke(255, startScreenGreen, 0);
    text("Apollo's Labyrinth", 65, 50);
    
    
    //rect around start
    text("START", 150, 115);
    
    //fill(238, 50, 51);
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
    
    //sky
    fill(135,206,235);
    rect(0,0, 400, 400);
    
    //sun
    fill(255,100, 0);
    ellipse(0,0, 100, 100);
    
    //hill
    fill(0,51,0);
    ellipse(200, 400, 700, 200);
    
    //pillars for parthenon
    fill(255);
    rect(25, 250, 10, 75);
    rect(375, 250, 10, 75);
    
    fill(0);
    stroke(0);
    textSize(30);
    text("Rules", 150, 50);
    textSize(20);
    text("-Move with WSAD.", 50, 80);
    text("-Shoot with the arrow keys.", 50, 100);
    text("-Avoid enemies and their projectiles.", 50, 120);
    text("-Kill all enemies in a room to move on.", 50, 140);
    text("-Conquer each of the rooms.", 50, 160);
    text("Collect all 3 keys to win.", 50, 180);
    fill(255);
    text("Click the arrow to go the to main menu.", 25, 350);
    
    noStroke();
    //back arrow
    textSize(50);
    rect(90, 25, 35, 15);
    triangle(90, 15, 90, 50, 60, 32);
    stroke(255);
    noFill();
    rect(55, 10, 80, 42);   
  }
  //game screen
  else if(game.screen == 2){
    startSong.stop();
    stroke(0);
    fill(0);
    text("Game Screen" , 100, 200);
    
  }
  //game over screen
  else if(game.screen == 3){
    stroke(0);
    fill(0);
    text("Game Over" , 100, 200);
  }
  
}