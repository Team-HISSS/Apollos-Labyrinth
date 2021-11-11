// sketch.js
// Description: You will be teleported to Greece during the ancient times when man lived under the breath of Zeus and worshipped the Olympian Gods as part of daily life. This very moment, the city of Athens is feeling the wrath of Zeus. Apollo, the God of Sun, archery, music, prophecy and healing, has been punished for the third time, to be banished to Ogygia until only Zeus deems it not to be. With this, the prophecies have been obstructed and sickness is felling through the cities of Greece. The final prophecy, coming from the ancient woods of Dadona, was "Seek the sire of the Sun, let him qwell the flames of Helios, strike the head of the slythering one, and take back the seat at Delhpi."

// Born among the peasants, you are shocked to hear the words that have been spoken by your mother on her death bed, "Your father is Apollo". Now it is your time to fight the way through the horrors that wait in the labyrinth.
//
// AUTHOR:  Skyler Smith, Shlok Aggarwal, Sarang Vadi Rajeev
// COURSE:  ECE 4525
// DATE:    October 29, 2021

// Link to demo: https://preview.p5js.org/sarang_r/present/UL5m8Ulab
  
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
  var game;
  var startScreenGreen = 0;
  var firework;
  let startSong, mapSong, bossSong;
  let parthenon;
  var beamChoice = [0, 0, 0, 0, 0, 0, 0, 0];
  var arrowFallingList = [];
  let archerRight = [];
  let up = [];
  let right = [];
  let left = [];
  let down = [];
  
  var tileSquare = 0;
  var tileUneven = 0;
  var tileFancy = 0;
  
  var spriteSheet;
  var runAnimation = [];
  var index = 0;
  var speed = 0.3;
  var knight;
  let archer;

  var harpySprite;
  var flyHarpy = [];
  var harpy;

  var snakeSheet; 
  var snakeAnimations;

  var doorway = 0;
  var door = 0;
  var wall1 = 0;
  var wall2 = 0;
  var roof = 0;
  let name;
  
  // Preloads the images and mp3 file for the game
  function preload() {
    startSong = loadSound("./resources/dark-forest.mp3", loaded);
    parthenon = loadImage('/resources/temple.png');
    sunImage = loadImage('/resources/sun.png');
    sunBeam1 = loadImage('/resources/sunbeam1.png');
    sunBeam2 = loadImage('/resources/sunbeam2.png');
    arrowImg = loadImage('/resources/arrow.png');
    architSheet = loadImage('/resources/Ancient_Greek_Architecture.png');

    spriteSheet = loadImage('/resources/sprites/SpriteSheet.png');
    harpySprite = loadImage('/resources/sprites/harpy_sprite.png');
    archerSprite = loadImage('/resources/sprites/archer_spriteSheet.png');
    snakeSheet = loadImage('/resources/snakeSheet.png');

  }
  
  // Puts the song on loop, so that the music plays throughout the game
  function loaded() {
    startSong.loop();
  }
  
  // Captures all the pictures 
  function setup() {
    captureAllAnimation();
    createCanvas(3600, 3600);
    //startSong = loadSound('assets/dark-forest.mp3');
  
    //knight animations
    background(0, 220, 0, 0);
    image(harpySprite, 0, 200);
    flyHarpy.push(get(5, 340, 65, 45));
    flyHarpy.push(get(70, 340, 70, 45));
    flyHarpy.push(get(140, 340, 50, 45));
    harpy = new HarpyObj(200, 50);
  
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

    //draw snakes
    image(snakeSheet, 0, 0, 400, 400);
    //3 horizontal animations
    snake_1 = get(10, 130, 20, 35);
    snake_2 = get(47.5, 130, 20, 35);
    snake_3 = get(87.5, 130, 20, 35);
    //2 vertical animations
    snake_5 = get(50, 360, 20, 40);
    snake_6 = get(90, 360 , 20 ,40);
    snakeAnimations = [snake_1, snake_2, snake_3, snake_5, snake_6];

    // Creates archer and moving names of authors
    archer = new ArcherObj(100, 250);
    name = new NameObj(35, 395);
    game = new GameObj();
  
  //initialize tilemap
  game.initializeTileMap();
  }
  
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
        
        harpy.flyAnimate();
        harpy.draw();

        archer.draw();
        archer.move();
        name.draw();

    }
  
    //instructions screen
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
      
      for (var i = 0; i < game.tiles.length; i++) {
          image(tileSquare, game.tiles[i].x, game.tiles[i].y, 20, 20);
      }
      
      game.player.draw();
      game.player.checkMovement();
            
      for(var i = 0; i < game.harpies.length; i++){
        game.harpies[i].draw();
      }
      for(var i = 0; i < game.walls.length; i++){
        game.walls[i].draw();
      }
      for(var i = 0; i < game.doors.length; i++){
        //print(game.doors[i].x);
        game.doors[i].draw();
      }

      //game.map.printMap();
    }

    //game over screen
    else if (game.screen == 3) {
        background(255);
        stroke(0);
        fill(0);
        text("Game Over", 100, 200);
    }
  
  }


  function move(){
    if(keyIsDown(UP_ARROW)){
    xPos += -speed;
  }
   if(keyIsDown(DOWN_ARROW)){
    xPos += speed;
  }
  if(keyIsDown(LEFT_ARROW)){
    yPos += -speed;
  }
   if(keyIsDown(RIGHT_ARROW)){
    yPos += speed;
  }
}

function rotateAround(){
  if(mouseX>width/2){
    angle += 0.01;
  }
  if(mouseX< width/2){
    angle += 0.001;
  }
}

