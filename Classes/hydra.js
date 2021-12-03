class Hydra{
    constructor(x, y, rx, ry, roomNum){
        this.rx = rx;
        this.ry = ry;
        this.speed = 1;
        this.index = 0;
        this.x = x;
        this.y = y;
        this.roomNum = roomNum;
        //this.state = [new WanderState(), new ChaseState()];
        this.currState = 0;
        this.dead = false;
        this.currState = 0;
        this.xMove = int(random(-1, 1));
        this.yMove = int(random(-1, 1));
        this.state = [new hydraChaseState(), new hydraWanderState()];
        this.currState = 0;
        if (this.xMove == 0){
            this.xMove = -1;
        }
        if (this.yMove == 0){
           this.yMove = 1;
        }
    }

    draw(){
        if (this.xMove > 0){
            push();
                image(hydraRight[int(this.index)], this.x, this.y, harpySize, harpySize);
            pop();
        }
        else{
            push();
                image(hydraLeft[int(this.index)], this.x, this.y, harpySize, harpySize);
            pop();
        }
    }
    fly() {
        this.x += this.speed; 
    }
    flyAnimate() {
        this.index += 0.12;
        if(this.index >= 3){
            this.index = 0;
        }
        this.x += this.speed;
        if (this.x > width) {
            this.x = 10;
        }
    }
    wanderAnimate(){
        if (game.player.roomNum == this.roomNum){
            this.index+= 0.12;
            if(this.index >= 3){
                this.index = 0;
            }

            if (this.x + this.xMove >= this.rx*400 +340){
                this.xMove = -this.xMove
            }
            else if (this.x + this.xMove <= this.rx*400 + 40){
                this.xMove = -this.xMove;
            }
            if (this.y + this.yMove >= this.ry*400 + 340){
                this.yMove = -this.yMove
            }
            else if (this.y + this.yMove <= this.ry*400 + 40){
                this.yMove = -this.yMove;
            }
            this.x += this.xMove;
            this.y += this.yMove;
        }
    }
}

class hydraWanderState{
    constructor(){

    }
    execute(me){ // executing the wander state

        if (dist(me.x, me.y, game.player.x, gameplayer.y) <= 50){ // if the distance between any enemy and the player is less than 15 pixels switch to chase state
            me.currState = 1;
        }
        // check the line of sight of the arrow to avoid it 
        if (game.player.roomNum == me.roomNum){
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
}

class  hydraChaseState{
    constructor(){
        this.move = 0.5;
        this.velocity = createVector(1, 1);
    }
    execute(me){
        this.move = 0.5;
        if (dist(me.x, me.y, game.player.x, game.player.y) > 50){
            me.currState = 0;
        }
        // Death transition to death state to be implemented in main/arrow
        // also check the line of sight of the arrow in order to avoid it
        this.velocity.set(game.player.x - me.x, game.player.y - me.y);
        this.velocity.setMag(1.5);
        me.index+= 0.12; // move the enemy
        if(me.index >= 3){
            me.index = 0;
        }
        if (me.x + this.velocity.x >= me.rx*400 +340){
            this.velocity.x = -this.velocity.x;
            me.xMove = this.velocity.x;
        }
        else if (this.x + this.xMove <= this.rx*400 + 40){
            this.velocity.x = -this.velocity.x;
            me.xMove = this.velocity.x;
        }
        if (this.y + this.yMove >= this.ry*400 + 340){
            this.velocity.y = -this.velocity.y;
        }
        else if (this.y + this.yMove <= this.ry*400 + 40){
            this.velocity.y = -this.velocity.y;
        }
        me.xMove = this.velocity.x;
        me.x += this.velocity.x;
        me.y += this.velocity.y;
        // if (game.player.check_collision_with_hydra(0, 0);
        // if ()
    }
}


