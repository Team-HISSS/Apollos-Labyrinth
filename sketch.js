// sketch.js
// Description: You will be teleported to Greece during the ancient times when man lived under the breath of Zeus and worshipped the Olympian Gods as part of daily life. This very moment, the city of Athens is feeling the wrath of Zeus. Apollo, the God of Sun, archery, music, prophecy and healing, has been punished for the third time, to be banished to Ogygia until only Zeus deems it not to be. With this, the prophecies have been obstructed and sickness is felling through the cities of Greece. The final prophecy, coming from the ancient woods of Dadona, was "Seek the sire of the Sun, let him qwell the flames of Helios, strike the head of the slythering one, and take back the seat at Delhpi."

// Born among the peasants, you are shocked to hear the words that have been spoken by your mother on her death bed, "Your father is Apollo". Now it is your time to fight the way through the horrors that wait in the labyrinth.
//
// AUTHOR:  Skyler Smith, Shlok Aggarwal, Sarang Vadi Rajeev
// COURSE:  ECE 4525
// DATE:    October 29, 2021

// Link to demo: https://preview.p5js.org/sarang_r/present/UL5m8Ulab

// Creates the Game Object class containing the tilemap
class GameObj {
    //Game object class
    constructor() {
        //tilemap array
        this.tileMap = [];

        //private members of game
        this.screen = 0;
    }
}

// Creates Harpy Object class which is used to create and move the harpy
class harpyObj {
    constructor(x, y, speed) {
        this.speed = speed;
        this.index = 0;
        this.x = x;
        this.y = y
    }
    fly() {
        var curIndex = floor(this.index % flyHarpy.length);
        push();
        // scale(-1, 1);
        // translate(-200, 200);
        // rotate(PI/2);

        image(flyHarpy[curIndex], this.x, this.y);
        pop();
    }
    flyAnimate() {
        this.index += this.speed;
        this.x += this.speed * 9;
        if (this.x > width) {
            this.x = -10;
        }
    }
}
var harpySprite;
var flyHarpy = [];
var harpy;

// Creates Knight Object class which is used to create and move the knight
class knightObj {
    constructor(x, y, speed) {
        this.speed = speed;
        this.index = 0;
        this.x = x;
        this.y = y
    }
    run() {
        var curIndex = floor(this.index % runAnimation.length);
        push();
        scale(-1, 1);
        // translate(-200, 200);
        // rotate(PI/2);

        image(runAnimation[curIndex], this.x, this.y);
        pop();
    }
    runAnimate() {
        this.index += this.speed;
        this.x -= this.speed * 5;
        if (this.x < -width) {
            this.x = 100;
        }
    }
}

// Creates Name Object class which is used to display a moving 
// sequence of names of the authors of the game
class NameObj{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  draw(){
    push();
      textSize(18);
      fill(0);  
      stroke(0);
      text("By Skyler Smith, Shlok Aggarwal, Sarang Rajeev", this.x, this.y)
    pop();
    this.move();
  }
  move(){
    this.x -= 1;
    if(this.x < -400){
      this.x = 400;
    }
  }
}

// Creates Arrow Object class which is used to create and move the arrow
class ArrowObj {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.vec = new p5.Vector(0, -1);
        this.vec.set(cos(this.angle), sin(this.angle));
    }
    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);

        image(arrowImg, this.x, this.y, 25, 25);

        rotate(-this.angle);
        translate(-this.x, -this.y);
        pop();
    }
    fall(range) {

    }
}

//if mouse is clicked in main menu
function mouseClicked() {
    var x = mouseX;
    var y = mouseY;

    //start game is pressed to start the game screen
    if (game.screen == 0) {
        if (x >= 20 && x <= 170 && y >= 345 && y <= 380) {
            game.screen = 2;
        }
        //rules are pressed to go to rules screen
        if (x >= 200 && x <= 380 && y >= 345 && y <= 380) {
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
var beamChoice = [0, 0, 0, 0, 0, 0, 0, 0];
var arrowFallingList = [];
let archerRight = [];

var tileSquare = 0;
var tileUneven = 0;
var tileFancy = 0;

var spriteSheet;
var runAnimation = [];
var index = 0;
var speed = 0.3;
var knight;
let archer;

var doorway = 0;
var door = 0;
var wall1 = 0;
var wall2 = 0;
var roof = 0;
let name;

// Preloads the images and mp3 file for the game
function preload() {
    startSong = loadSound("./dark-forest.mp3", loaded);
    parthenon = loadImage('temple.png');
    sunImage = loadImage('sun.png');
    sunBeam1 = loadImage('sunbeam1.png');
    sunBeam2 = loadImage('sunbeam2.png');
    arrowImg = loadImage('arrow.png');
    spriteSheet = loadImage('SpriteSheet.png');
    architSheet = loadImage('Ancient_Greek_Architecture.png');
    harpySprite = loadImage('harpy_sprite.png');
    archerSprite = loadImage('archer_spriteSheet.png');
}

// Puts the song on loop, so that the music plays throughout the game
function loaded() {
    startSong.loop();
}

// Captures all the pictures 
function setup() {
    captureAllAnimation();
    createCanvas(400, 400);
    //startSong = loadSound('assets/dark-forest.mp3');
  
    arrowFallingList = [new ArrowObj(random(25, 375), -50, PI / 2), 
                        new ArrowObj(random(25, 375), -50, PI / 2), 
                        new ArrowObj(random(25, 375), -50, PI / 2)];

    //knight animations
    background(0, 220, 0, 0);
    image(harpySprite, 0, 200);
    flyHarpy.push(get(5, 340, 65, 45));
    flyHarpy.push(get(70, 340, 70, 45));
    flyHarpy.push(get(140, 340, 50, 45));
    harpy = new harpyObj(200, 50, 0.1);
    clear();
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
    knight = new knightObj(-100, 300, 0.3);

    //draw tiles
    image(architSheet, 0, 0, 400, 400);
    tileSquare = get(120, 180, 60, 60);
    tileUneven = get(180, 180, 60, 60);
    tileFancy = get(240, 220, 60, 60);

    //draw doors and walls
    image(architSheet, 0, 0, 400, 400);
    tileSquare = get(120, 180, 60, 60);
    tileUneven = get(180, 180, 60, 60);
    tileFancy = get(240, 220, 60, 60);
    doorway = get(360, 180, 40, 40);
    door = get(369, 367, 22, 30);
    wall1 = get(20, 300, 60, 60);
    roof = get(320, 45, 60, 55);
    wall2 = get(200, 120, 40, 40);
  
    // Creates archer and moving names of authors
    archer = new Archer(archerRight, 'r', 100, 250);
    name = new NameObj(35, 395);
}

function createWalls(){
  for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++)
          image(tileSquare, i * 20, j * 20, 20, 20);
  }
  image(parthenon, 100, 60, 200, 200);
  for (var i = 0; i < 20; i++) {
      image(wall1, i * 20, 0, 20, 20);
      image(wall1, i * 20, 380, 20, 20);
  }
  for (var i = 0; i < 20; i++) {
      image(wall1, 0, i * 20, 20, 20);
      image(wall1, 380, i * 20, 20, 20);
  }
}

var step = 0;

function draw() {

    //   //starting screen for game
    if (game.screen == 0) {

        background(135, 206, 235);
        noStroke();

        createWalls();

        startScreenGreen += 2;
        if (startScreenGreen >= 165) {
            startScreenGreen = 0;
        }

        //Title
        fill(255, 0, 0);
        stroke(255, 0, 0);
        text("Apollo's Labyrinth", 65, 50);

        textSize(20);
        text("Click start to play or the rules:", 75, 335);


        fill(255, startScreenGreen, 0);
        stroke(255, startScreenGreen, 0);
        //rect around start
        textSize(35);
        text("START", 35, 375);
        text("RULES", 245, 375);

        push();
          
        pop();
        noFill();
        //rect around rules
        rect(20, 345, 150, 35);
        //rect around start
        rect(230, 345, 150, 35);


        // knight and archer running
        // harpy flying

        knight.run();
        knight.runAnimate();
        harpy.fly();
        harpy.flyAnimate();
        archer.draw();
        archer.move();
        name.draw();
        //   push();
        //   scale(-1, 1);
        //   // translate(-200, 200);
        //   // rotate(PI/2);

        //   image(runAnimation[curIndex],-410, 200);
        //   index = index + speed;
        //   pop();
        // image(runAnimation[8],200, 200);
        //draw parthenon
        //image(parthenon, 150, 140, 100, 100);

        //try to transition into darkness for game screen
        // for(var i = 0; i < 100; i++){
        //   image(doorway, 150 , 140 - step, step + 100, step + 100);
        //   step += 0.01;
        // }

        // image(doorway, 180 , 200, 40, 40);
        // image(door, 188, 205, 23, 35);
        // image(roof, 180, 160 , 40, 42);
    }

    //instructuions screen
    else if (game.screen == 1) {
        background(135, 206, 235);

        noStroke();
        //sky
        fill(135, 206, 235);
        rect(0, 0, 400, 400);

        //makes sun beams flicker
        push();

        translate(50, 50);

        for (var i = 0; i < beamChoice.length; i++) {

            if (beamChoice[i] <= 20) {
                image(sunBeam2, 0, 0, 100, 100);
                beamChoice[i]++;
            }
            else {
                image(sunBeam1, 0, 0, 100, 100);
                beamChoice[i]++;
                if (beamChoice[i] >= 40) {
                    beamChoice[i] = 0;
                }
            }
            rotate(PI / 4);
            //print(beamChoice[i]);
        }
        pop();

        //draw sun
        image(sunImage, -25, -25, 150, 150);
        //draw parthenon
        image(parthenon, 150, 200, 100, 100);

        //hill
        fill(0, 51, 0);
        ellipse(200, 400, 700, 200);

        fill(0);
        stroke(0);
        textSize(30);
        text("Rules", 150, 50);
        textSize(20);
        text("-Move with WASD.", 50, 80);
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
        knight.run();
        knight.runAnimate();
        harpy.fly();
        harpy.flyAnimate();
        archer.draw();
        archer.move();
        //bounding box for back screen
        rect(160, 350, 80, 42);
    }
    //game screen
    else if (game.screen == 2) {
        background(255);
        startSong.stop();
        stroke(0);
        fill(0);
        text("Game Screen", 100, 200);
    }
    //game over screen
    else if (game.screen == 3) {
        background(255);
        stroke(0);
        fill(0);
        text("Game Over", 100, 200);
    }

}