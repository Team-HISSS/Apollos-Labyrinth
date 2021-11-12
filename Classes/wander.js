// Creates Harpy Object class which is used to create and move the harpy
class WanderState{
    constructor() {
      this.direction = 1;
    }
    //execute wander
    execute(me) {
      //move enemy in one direction.
      //update physics of enemy
      me.update();
      
      //if NPC hits side of screen, reverse direction
      if (me.position.x >= 760) {
        me.position.x = 758;
        me.walkBackward = 1;
        me.walkForward = 0;
        this.direction = -1;
      }
      //if NPC hits side of screen, reverse direction
      else if (me.position.x <= 40) {
        me.position.x = 42;
        me.walkBackward = 0;
        me.walkForward = 1;
        this.direction = 1;
      }
      //bottom platform of enemy
      if (me.position.y >= 360 && me.position.y <= 450) {
        me.position.y = 360;
        me.velocity.y = 0;
        me.acceleration.y = 0;
        me.jump = 0;
        me.isJumping = false;
      }
  
      //loop through each of the walls and if the direction it is heading is off a platform in wander then it should turn around
      me.isOnWall = false;
      for (var i = 0; i < game.wallList.length; i++) {
        if (
          dist(
            me.position.x + 40,
            me.position.y - 10,
            game.wallList[i].x + 40,
            game.wallList[i].y - 20
          ) < 15
        ) {
          me.isOnWall = true;
        }
        if (
          dist(
            me.position.x - 40,
            me.position.y - 10,
            game.wallList[i].x - 40,
            game.wallList[i].y - 20
          ) < 15
        ) {
          me.isOnWall = true;
        }
      }
      //turn arounnd on edge of platform
      if (!me.isOnWall) {
        if (me.walkBackward == 1) {
          me.walkBackward = 0;
          me.walkForward = 1;
          this.direction = 1;
        } else if (me.walkForward == 1) {
          this.direction = -1;
          me.walkBackward = 1;
          me.walkForward = 0;
        }
      }
      
      //change condition from wonder to chase state
      if (
        dist(
          me.position.x,
          me.position.y,
          game.playerList[0].position.x,
          game.playerList[0].position.y
        ) <= 120
      ) {
        me.changeState(1);
      }
    }
  }
