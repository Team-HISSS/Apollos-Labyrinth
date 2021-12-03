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
            mapSong.play();
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
  let game_paused = false;
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
  let shootLeft = [];
  let shootUp = [];
  let shootRight = [];
  let shootDown = [];
  let arrowCapture;
  let arrowIndex = 0;
  let easterEggCapture = [];

  let harpySize = 64;
  let wall_center_radius = 10;
  let harpy_center_radius = harpySize/2;
  
  var tileSquare = 0;
  var tileUneven = 0;
  var tileFancy = 0;
  
  var spriteSheet;
  var runAnimation = [];
  var index = 0;
  var speed = 0.3;
  var knight;
  let archer;
  let architSheet;

  var harpySprite;
  var flyHarpyLeft = [];
  var flyHarpyRight = [];
  //var harpy;

  var heartSheet;
  var heartCapture = [];

  var objectSheet;

  let enemyHudCapture = [];
  let enemyHud;

  var olympus; 
  var clouds = [];
  
  var hydrasheet;
  var hydrasheetMirror;
  var hydraRight = [];
  var hydraLeft = [];

  var snakeSheet; 
  var snakeAnimations;
  var snakesList = [];
  var keySheet; 
  var keyImage; 
  var keyList = [false, false, false];
  var keyCount = 0;  

  var balSheet; 
  var balista1, balista2, balista3, balista4;
  var balList = [];
  var balArrow;

  var doorway = 0;
  var door = 0;
  var wall1 = 0;
  var wall2 = 0;
  var roof = 0;
  let name;
  
  // Preloads the images and mp3 file for the game
  function preload() {
    startSong = loadSound("./resources/dark-forest.mp3", loaded);
    mapSong = loadSound("./resources/Labyrinth.mp3");
    bossSong = loadSound("./resources/chase.mp3");

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
    heartSheet = loadImage('/resources/health_bars2.png');
    balSheet = loadImage('/resources/sprites/BallistaSprite.png');
    objectSheet = loadImage('/resources/objects2.png');
    hydraSheet = loadImage('/resources/HydraSprite.png');
    keySheet = loadImage('/resources/Key.png');
    hydraSheetMirror = loadImage('/resources/HydraSprite_mirror.png');
    olympus = loadImage('/resources/olympus.jpg');
    enemyHud = loadImage('/resources/enemy_hud2.png')
  }
  
  // Puts the song on loop, so that the music plays throughout the game
  function loaded() {
    startSong.loop();
  }
  
  // Captures all the pictures 
  function setup() {
    captureAllAnimation();
    createCanvas(400, 400);   
    
    //create snake picture
    image(snakeSheet, 0, 0, 400, 400);
    //3 horizontal animations
    var snake_1 = get(10, 130, 20, 35);
    var snake_2 = get(47.5, 130, 20, 35);
    var snake_3 = get(87.5, 130, 20, 35);
    //2 vertical animations
    var snake_5 = get(50, 360, 20, 40);
    var snake_6 = get(90, 360 , 20 ,40);
    snakeAnimations = [snake_1, snake_2, snake_3, snake_5, snake_6];
    
    // Creates the harpy, snake, and knight
    //harpy = new HarpyObj(200, 50);
    harpiesList = [new HarpyObj(200, 50), new HarpyObj(-100, 100), new HarpyObj(260, 250), new HarpyObj(400, 175), new HarpyObj(300, 137.5)]; 
    snakesList = [new SnakeObj(100, 250), new SnakeObj(220, 350), new SnakeObj(350, 250)];
    knight = new knightObj(-100, 300, 0.3);
    
    clouds = [new CloudObj(-100, 200) , new CloudObj(100, 300)];
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
  
        // knight.run();
        // knight.runAnimate();
        
        harpiesList[0].flyAnimate();
        harpiesList[0].drawTitleScreen();
        for(var i = 0; i < snakesList.length; i++){
          snakesList[i].snakeEndMove();
          snakesList[i].draw();
        }

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
        text("Rules", 150, 25);
        textSize(15);
        text("-Move with WASD.", 80, 70);
        text("-Shoot with the spacebar.", 80, 85);
        text("-Press P to pause.", 80, 100);
        text("-Press m to pull up map.", 80, 115);
        text("-Gems make you temporarily", 80, 130);
        text("  invincible to melee attacks.", 80, 145)
        text("-Collect pots to gain health." , 80 , 160)
        text("-Avoid enemies and their projectiles.", 80, 175);
        text("-Kill all enemies in a room to move on.", 80, 190);
        text("-Conquer each of the rooms.", 80, 205);
        text("-Collect all 3 keys to win.", 80, 220);
        fill(255);
        text("Click the arrow to go the to main menu.", 25, 340);
  
        noStroke();
        //back arrow
        textSize(50);
        rect(195, 362.5, 40, 15);
        triangle(195, 355, 195, 385, 165, 370);
        stroke(255);
        noFill();
        // knight.run();
        // knight.runAnimate();
        harpy.fly();
        harpy.flyAnimate();
        archer.draw();
        archer.move();
        //bounding box for back screen
        rect(160, 350, 80, 42);
    }
    //game screen
    else if (game.screen == 2 && !game_paused) {
      push();
      print(game.tm.rooms[game.player.roomNumber].numEnemies);
      var roomOffsetX = game.player.rx * 400;
      var roomOffsetY = game.player.ry * 400;
      // print(roomOffsetX, roomOffsetY);
      // fill(255, 0 ,0);
      // ellipse(roomOffsetX, roomOffsetY, 20, 20)
      // print(game.player.roomNumber);
      // print(game.tm.rooms[game.player.roomNumber].numEnemies);
      translate(-roomOffsetX, -roomOffsetY)
        // background(255);
        startSong.stop();
      
      for (var i = 0; i < game.tiles.length; i++) {
          image(tileSquare, game.tiles[i].x, game.tiles[i].y, 20, 20);
      }

      // Draws the easter eggs for the game
      for(let egg of game.easterEggs){
        if(!egg.taken){
          egg.draw();
        }
      }      

     
      // draw harpies 
      for(let harpy of game.harpies){
        if(!harpy.dead){
          harpy.draw();
          harpy.wanderAnimate();
        }
      }
      
      // draw snakes
      for(var i = 0; i < game.snakes.length; i++){
        if(!game.snakes[i].dead){
          game.snakes[i].draw();
          game.snakes[i].state[game.snakes[i].currState].execute(game.snakes[i]);
        }
      }

      for(var i = 0; i < game.walls.length; i++){
        game.walls[i].draw();
      }

      //print(game.player.roomNumber);
      for(var i = 0; i < game.doors.length; i++){
        //print(game.doors[i].x);
        if(game.tm.rooms[game.player.roomNumber].numEnemies == 0){
          // if(!game.player.transiion){
            game.doors[i].open = true;
          // }
        }
        if (!game.doors[i].open){ // checking if the door is open or not: True if open, False is closed
          game.doors[i].draw();
        }
      }

      for(let hydra of game.hydras){
        if(!hydra.dead && game.player.roomNumber == hydra.roomNum){
          hydra.draw();
          hydra.spawnSnakes();
          hydra.state[hydra.currState].execute(hydra);
          // Displaying the Hydra HUD i.e. health of the hydra
          let hitIndex = hydra.hit;
          if(hitIndex < 5){
            push();
              translate((roomOffsetX + 224), roomOffsetY + 0)
              scale(-1, 1);
              image(enemyHudCapture[hitIndex], -96, 0, 96, 18);
            pop();
          }
        }
        else if(hydra.dead && game.player.roomNumber == hydra.roomNum){
          push();
              translate((roomOffsetX + 224), roomOffsetY + 0)
              scale(-1, 1);
              image(enemyHudCapture[5], -96, 0, 96, 18);
          pop();
          
          // Checking the room for keys
          for(var i = 0; i < game.keys.length; i++){
            if(game.keys[i].roomNum == hydra.roomNum){
              game.keys[i].draw();
              break;
            }
          }
        }
      }

      // print("balista size: " + game.balistas.length);
      //b1 = new BalistaObj(game.player.x, game.player.y, 0,0, 1);
      //b1.draw();
      for(var i = 0; i < game.balistas.length; i++){
        game.balistas[i].draw();

        if(game.player.roomNumber == game.balistas[i].roomNum){
          
          game.balistas[i].states[game.balistas[i].state].execute(game.balistas[i]);

          if (game.balistas[i].bullet[0].fired) {
            game.balistas[i].bullet[0].draw();
          }
          if (game.balistas[i].state != 3) { // if the enemy is not dead then draw its orginal shape and structure 
            game.balistas[i].draw();
          }
        }
        //reset bullets shot when not in same room 
        else{
          game.balistas[i].bullet.fired = false; 
        }
      }
      
      
      // print('Number of enemies in the room ' + game.tm.rooms[game.player.roomNumber].numEnemies)
      
      game.player.draw();
      game.player.checkMovement();
      
      //draw keys
      //print("length: " + game.keys.length);
      push();


      //draw keys in top left of screen
      textSize(20); 
      stroke(0,0,0);
      fill(255,255,255);
      text("Keys:" , roomOffsetX + 10 , roomOffsetY + 15);
      pop();
      for(var i = 0; i < game.player.keyCount; i++){
        image(keyImage, roomOffsetX + 60 + i * 20, roomOffsetY, 20, 20); 
        keyList[i] = true; 
      }
      //if(keyList)

      //winning condition
      if(game.player.keyCount >= 3){
        game.screen = 4;
        game.player.setEndArcher();
      }

      // If the game.player.health is 0, the player is dead
      if(game.player.health <= 0){
        game.screen = 3; 
      }

      let ind = 3 - game.player.health;
      
      // Display health bar on HUD
      if(ind < 3) {
        image(heartCapture[ind], roomOffsetX + 332, roomOffsetY + 0, 66.1, 20)
      }
      
      // Displaying power boost on HUD
      if(powerBoost){
        image(easterEggCapture[2], roomOffsetX + 322, roomOffsetY + 0, 10.67, 20);
        if (pbCurrFrameCount < frameCount - 600){
          powerBoost = false;
          pbCurrFrameCount = 0;
        }
      }

      for(let arrow of game.arrows){
        arrow.draw();
      }

      if(game.tm.rooms[game.player.roomNumber].numEnemies == 0){
        // if(!game.player.transiion){
         game.player.inRoom = true;
        // }
      }
      if(game.tm.rooms[game.player.roomNumber].endRoom){
        //print("End Rooms -- sketch");
      }
      // game.map.printMap();
      // game.updateNeighborDoor();
      if (game.player.inRoom && game.player.transition){
        for (var i = 0; i < game.doors.length; i++){
          game.doors[i].open = false;
        }
        game.player.inRoom =false;
        game.player.transition = false;
      }

      // Death of the player
      if(game.player.dead){
        game.screen = 3;
      }
      pop();
    }
    // game during pause
    else if(game.screen == 2 && game_paused){
      background(220, 220, 220, 1);
      stroke('#7E570E');
      fill('#EB3C3C');
      text("Game Paused", 90, 100);
      
      // push();  
        // translate(-70, 0);
        game.tm.printMap(game.player.rx, game.player.ry);
      // pop();
    }
    //game over screen
    else if (game.screen == 3) {
      push();
      createWalls();
      stroke('#7E570E');
      fill('#EB3C3C');
      textSize(64);
      text("Game Over", 30, 200);
      textSize(25);
      text("You have died in the labyrinth", 38, 300);
      for(var i = 0; i < snakesList.length; i++){
        snakesList[i].snakeEndMove();
        snakesList[i].draw();
      }
      for(var i = 0; i < harpiesList.length; i++){
        harpiesList[i].flyAnimate();
        harpiesList[i].drawTitleScreen();
      }
      
      pop();



    }

    else if (game.screen == 4) {
      push();
      image(olympus, 0,0,400,400);
      for(var i = 0; i < clouds.length; i++){
        clouds[i].draw();
        clouds[i].move();
      }
      textSize(75);
      stroke(0);
      fill(0,99,65);
      text("Winner!", 100, 200);
      textSize(25)
      text("Apollo has safely" , 100 , 275);  
      text("returned to Olympus!", 100, 300);
      game.player.endDraw();
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

      //draw sun
      //image(sunImage, -25, -25, 150, 150);

      pop();

  }

    // game.tm.printMap();
    //game.tm.printMap();

    // Displays the map when the key "M" is held down
    if(keyIsDown(KEY_M) && !game_paused){
      background(220, 220, 220, 75);
      // print("Here");
      game.tm.printMap(game.player.rx, game.player.ry);
    }
  
  }

  // Enabling the pause screen
  function keyReleased() {
    if(keyCode === KEY_P){
      if(game_paused){
        game_paused = false;
      }
      else{
        game_paused = true;
      }
    }
    return false; // prevent any default behavior
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

