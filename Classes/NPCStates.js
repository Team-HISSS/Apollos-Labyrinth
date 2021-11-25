class wanderState{ // To make any enemy wander around in the room
    constructor(threshhold){
        this.threshhold = threshhold;
    }
    execute(me){ // executing the wander state 
        if (dist(me.x, me.y, game.player.x, gameplayer.y) <= this.threshhold){ // if the distance between any enemy and the player is less than 15 pixels switch to chase state
            me.currState = 1;
        }
        // check the line of sight of the arrow to avoid it 
        me.index+= 0.12; // move the enemy
        if(me.index >= 3){
            me.index = 0;
        }
        // Moving the enemy around in the map
        if (me.x + me.xMove >= me.rx*400 +340){
            me.xMove = -me.xMove
        }
        else if (this.x + this.xMove <= this.rx*400 + 40){
            me.xMove = -me.xMove;
        }
        if (this.y + this.yMove >= this.ry*400 + 340){
            me.yMove = -me.yMove
        }
        else if (this.y + this.yMove <= this.ry*400 + 40){
            me.yMove = -me.yMove;
        }
        // Changing the position of the enemy
        me.x += me.xMove;
        me.y += me.yMove;
        
    }
}

// Enemy chases the player if the player is withing 15 pixels
class chaseState{
    constructor(threshhold){
        this.threshhold = threshhold;
        this.move = 0.5;
        this.velocity = createVector(1, 1);
    }
    execute(me){
        this.move = 0.5;
        if (dist(me.x, me.y, game.player.x, game.player.y) > 15){
            me.currState = 0;
        }
        // Death transition to death state to be implemented in main/arrow
        // also check the line of sight of the arrow in order to avoid it
        this.velocity.set(game.player.x - me.x, game.player.y - me.y);
        this.velocity.setMag(0.5);
        me.index+= 0.12; // move the enemy
        if(me.index >= 3){
            me.index = 0;
        }
        if (me.x + this.velocity.x >= me.rx*400 +340){
            this.velocity.x = -this.velocity.x;
        }
        else if (this.x + this.xMove <= this.rx*400 + 40){
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.yMove >= this.ry*400 + 340){
            this.velocity.y = -this.velocity.y;
        }
        else if (this.y + this.yMove <= this.ry*400 + 40){
            this.velocity.y = -this.velocity.y;
        }
        me.x += this.velocity.x;
        me.y += thie.velocity.y;
        game.player.check_collision_with_specific_harpy(me);
        // if ()
    }
}
class avoidState{
    constructor(){

    }
    execute(me){

    }
}
class shootState{
    constructor(){

    }
    execute(me){

    }
}

class deathState{
    constructor(){

    }
    execute(me){

    }
}