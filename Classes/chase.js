//chase state 
class ChaseState {
    constructor() {
    }
    //execute chase state
    execute(me) {
      me.update();
      //if player is above npc, then the npc should jump up to the player
      if (!this.isFallMode) {
        if (
          me.position.y > game.playerList[0].position.y + 30 &&
          abs(me.position.x - game.playerList[0].position.x) < 60
        ) {
          me.jump = 2;
        }
        //if player is below npc, then it should try and fall off platform above
        if (
          me.position.y < game.playerList[0].position.y + 60 &&
          abs(me.position.x - game.playerList[0].position.x) < 10
        ) {
          this.isFallMode = true;
        }
        //NPC is to the right of the player, NPC should move left to chase
        else if (me.position.x >= game.playerList[0].position.x) {
          me.position.x -= 1;
        }
        //NPC is to the left of the player, NPC should move right to chase
        else if (me.position.x <= game.playerList[0].position.x) {
          me.position.x += 1;
        }
      }
      //is player is below npc, npc will choose a direction to try and leave platform
      else if (this.isFallMode) {
        if (abs(me.position.y - game.playerList[0].position.y) < 20) {
          this.isFallMode = false;
        }
        //chooses left when its > 400
        if (me.position.x > 400) {
          me.position.x -= 1;
          me.walkBackward = 1;
          //chooses right when its < 400
        } else if (me.position.x <= 400) {
          me.position.x += 1;
          me.walkForward = 1;
        }
      }
  
      //check if player is falling off a ledge
      me.isOnWall = false;
      for (var i = 0; i < game.wallList.length; i++) {
        
        if (
          dist(
            me.position.x - 10,
            me.position.y - 10,
            game.wallList[i].x - 10,
            game.wallList[i].y - 20
          ) < 20
        ) {
          me.isOnWall = true;
        }
      }
      //appply gravity
      if (!me.isOnWall) {
        me.isJumping = true;
        me.jump = 1;
      }
  
      //change from chase to wonder state
      if (
        dist(
          me.position.x,
          me.position.y,
          game.playerList[0].position.x,
          game.playerList[0].position.y
        ) > 120
      ) {
        //if it is in the fall mode or normal mode, it needs to know to continue moving in wander state so it does not get stuck
        
        //in fall mode
        if (this.isFallMode) {
          if (game.playerList[0].position.x - me.position.x > 0) {
            me.walkBackward = 1;
            me.walkForward = 0;
          } else {
            me.walkBackward = 0;
            me.walkForward = 1;
          }
        }
        //not in fall mode
        else {
          if (game.playerList[0].position.x - me.position.x > 0) {
            me.walkBackward = 1;
            me.walkForward = 0;
          } else {
            me.walkBackward = 0;
            me.walkForward = 1;
          }
        }
        me.changeState(0);
      }
    }
  }
  