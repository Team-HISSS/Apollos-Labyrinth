class knightObj{
  constructor(x, y, speed){
    this.speed = speed;
    this.index = 0;
    this.x = x;
    this.y = y
  }
  run(){
  var curIndex = floor(this.index%runAnimation.length);
    push();
    scale(-1, 1);
  // translate(-200, 200);
  // rotate(PI/2);
  
    image(runAnimation[curIndex],this.x, this.y);
    pop();
  }
  runAnimate(){
    this.index += this.speed;
    this.x -= this.speed*5;
    if (this.x < -width){
      this.x = 40;
    }
  }
}


class GameObj {
  //Game object class
  constructor() {
    //tilemap array
    this.tileMap = [];
    
    //private members of game
    this.screen = 0;
  }
}

class ArrowObj{
  constructor(x,y, angle){
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.vec = new p5.Vector(0, -1);
    this.vec.set(cos(this.angle), sin(this.angle));
  }
  draw(){
    push();
    translate(this.x, this.y);
    rotate(this.angle); 
    
    image(arrowImg, this.x, this.y, 25, 25);
    
    rotate(-this.angle);
    translate(-this.x, -this.y); 
    pop();
  }
  fall(range){
    
  }
}

//if mouse is clicked in main menu
function mouseClicked() {
  var x = mouseX;
  var y = mouseY;

  //start game is pressed to start the game screen
  if (game.screen == 0) {
    if (x >= 10 && x <= 160 && y >= 345 && y <= 380) {
      game.screen = 2;
    }
    //rules are pressed to go to rules screen
    if (x >= 240 && x <= 390 && y >= 345 && y <= 380) {
      game.screen = 1;
    }
  }
  //back arrow in rules screen goes to main screen
  if (game.screen == 1) {
    if (x >= 160 && x <= 240 && y >= 350 && y <= 392) {
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
var beamChoice = [0,0,0,0,0,0,0,0]; 
var arrowFallingList = []; 

var spriteSheet;
var runAnimation = [];
var index = 0;
var speed = 0.3;
var knight;

function preload(){
  startSong = loadSound("./dark-forest.mp3", loaded);
  parthenon = loadImage('temple.png');
  sunImage = loadImage('sun.png');
  sunBeam1 = loadImage('sunbeam1.png');
  sunBeam2 = loadImage('sunbeam2.png');
  arrowImg = loadImage('arrow.png');
  spriteSheet = loadImage('SpriteSheet.png');
}

function loaded(){
  startSong.loop();
}
function setup() {
  createCanvas(400, 400);
  //startSong = loadSound('assets/dark-forest.mp3');
  arrowFallingList = [new ArrowObj(random(25,375), -50, PI/2), new ArrowObj(random(25,375), -50, PI/2), new ArrowObj(random(25,375), -50, PI/2)]; 
  
  //knight animations
  image(spriteSheet, 0, 200, 400, 50);
  runAnimation.push(get(0, 206, 40, 44));
  runAnimation.push(get(40, 206, 40, 44));
  runAnimation.push(get(80, 206, 40, 44));
  runAnimation.push(get(120, 206, 40, 44));
  runAnimation.push(get(160, 206, 40, 44));
  runAnimation.push(get(200, 206, 40, 44));
  runAnimation.push(get(240, 206, 40, 44));
  runAnimation.push(get(280, 206, 40, 44));
  runAnimation.push(get(320, 206, 35, 43));
  runAnimation.push(get(355, 206, 40, 44));
  //imageMode(CENTER);
  knight = new knightObj(-200, 300, 0.3);
}

function draw() {
  
  //starting screen for game
  if(game.screen == 0){
    
    background(135,206,235);

    
    noStroke();
    //sky
    fill(135,206,235);
    rect(0,0, 400, 400);
    
    //makes sun beams flicker
    push();
    
    translate(50,50);
    
    for(var i = 0; i < beamChoice.length; i++)
    {
      
      if(beamChoice[i] <= 20)
      {
        image(sunBeam2, 0, 0, 100, 100);
        beamChoice[i]++;
      }
    else{
      image(sunBeam1, 0, 0, 100, 100);
      beamChoice[i]++; 
      if(beamChoice[i] >= 40){
        beamChoice[i] = 0; 
      }
    }
      rotate(PI/4);
      //print(beamChoice[i]);
    } 
    pop();
    
    //draw sun
    image(sunImage, -25, -25, 150, 150);
    //draw parthenon
    image(parthenon, 150, 200, 100, 100);
    
    
    
    //hill
    fill(0,51,0);
    ellipse(200, 400, 700, 200);
    
    // for(var i = 0; i < arrowFallingList[i].length; i++){
    //   arrowFallingList[i].draw();
    //   arrowFallingList[i].fall(random()); 
    // }
    
    startScreenGreen += 2; 
    if(startScreenGreen >= 165)
    {
      startScreenGreen = 0; 
    }

    //Title
    fill(255, 0, 0);
    stroke(255,0, 0);
    text("Apollo's Labyrinth", 65, 50);
    
    textSize(20);
    text("Click start to play or the rules:", 75, 335);
    
    
    fill(255, startScreenGreen, 0);
    stroke(255, startScreenGreen, 0);
    //rect around start
    textSize(35);
    text("START", 25, 375);
    text("RULES", 255, 375);
    
    noFill();
    //rect around rules
    rect(10, 345, 150, 35);
    //rect around start
    rect(240, 345, 150, 35);
    
    
    //knight running
    var curIndex = floor(index%runAnimation.length);
    knight.run();
    knight.runAnimate();
    //   push();
    //   scale(-1, 1);
    //   // translate(-200, 200);
    //   // rotate(PI/2);
  
    //   image(runAnimation[curIndex],-410, 200);
    //   index = index + speed;
    //   pop();
    // image(runAnimation[8],200, 200);
    
  }
  
  //instructuions screen
  else if(game.screen == 1){
    background(135,206,235);   
    
    noStroke();
    //sky
    fill(135,206,235);
    rect(0,0, 400, 400);
    
    //makes sun beams flicker
    push();
    
    translate(50,50);

    for(var i = 0; i < beamChoice.length; i++)
    {
      
      if(beamChoice[i] <= 20)
      {
        image(sunBeam2, 0, 0, 100, 100);
        beamChoice[i]++;
      }
    else{
      image(sunBeam1, 0, 0, 100, 100);
      beamChoice[i]++; 
      if(beamChoice[i] >= 40){
        beamChoice[i] = 0; 
      }
    }
      rotate(PI/4);
      //print(beamChoice[i]);
    } 
    pop();
    
    //draw sun
    image(sunImage, -25, -25, 150, 150);
    //draw parthenon
    image(parthenon, 150, 200, 100, 100);
    
    //hill
    fill(0,51,0);
    ellipse(200, 400, 700, 200);
    
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
    text("-Collect all 3 keys to win.", 50, 180);
    fill(255);
    text("Click the arrow to go the to main menu.", 25, 340);
    
    noStroke();
    //back arrow
    textSize(50);
    rect(195, 362.5, 40, 15);
    triangle(195, 355, 195, 385, 165, 370);
    stroke(255);
    noFill();
    
    //bounding box for back screen
    rect(160, 350, 80, 42);
  }
  //game screen
  else if(game.screen == 2){
    background(255);
    startSong.stop();
    stroke(0);
    fill(0);
    text("Game Screen" , 100, 200);
  }
  //game over screen
  else if(game.screen == 3){
    background(255);
    stroke(0);
    fill(0);
    text("Game Over" , 100, 200);
  }
  
}