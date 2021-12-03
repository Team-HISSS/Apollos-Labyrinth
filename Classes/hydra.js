class Hydra{
    constructor(x, y, rx, ry, roomNum){
        this.rx = rx;
        this.ry = ry;
        this.speed = 1;
        this.index = 0;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.roomNum = roomNum;
        this.collided = false;
        this.hit = 0;
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
                image(hydraRight[int(this.index)], this.x - hydra_center_radius_x, this.y - hydra_center_radius_y, hydra_center_radius_x*2, hydra_center_radius_y*2);
            pop();
        }
        else{
            push();
                image(hydraLeft[int(this.index)], this.x - hydra_center_radius_x, this.y - hydra_center_radius_y, hydra_center_radius_x*2, hydra_center_radius_y*2);
            pop();
        }

        push();
            fill(255,255, 0);
            ellipse(this.x, this.y, 20, 20);
        pop();
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
        if (game.player.roomNumber == this.roomNum){
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
    spawnSnakes(){
        if(frameCount % 180 == 0){
            game.snakes.push(new SnakeObj(this.x, this.y, this.rx, this.ry));
            game.tm.rooms[game.player.roomNumber].numEnemies += 1; // check what happens if the player exits the room
        }

    }
}

class hydraWanderState{
    constructor(){
        this.away = false;
    }
    execute(me){ // executing the wander state
        // print("Here");
        if (me.collided){
            if(!this.away){
                me.xMove = int(random(-1, 1));
                me.yMove = int(random(-1, 1));
                if (me.xMove == 0){
                    me.xMove = -1;
                }
                if (me.yMove == 0){
                    me.yMove = 1;
                }
                this.away = true;
            }
            if(dist(me.x, me.y, game.player.x, game.player.y) > 190){
                me.collided = false;
            }

        }
        else {
            this.away = false;
            if (dist(me.x, me.y, game.player.x, game.player.y) <= 150){ // if the distance between any enemy and the player is less than 15 pixels switch to chase state
            //    if(me.collided){
            //     if(dist(me.x, me.y, game.player.x, gameplayer.y) > 190){
            //         print("Hmmm");
            //         me.collided = false;
            //         // me.currState = 1;
            //         // this.frame = frameCount;
            //     }
            //    }
            
                me.currState = 0;
            
                
            }
        }
        // check the line of sight of the arrow to avoid it 
        if (game.player.roomNumber == me.roomNum){
            me.index+= 0.12; // move the enemy
            if(me.index >= 3){
                me.index = 0;
            }
            // Moving the enemy around in the map
            if (me.x + me.xMove >= me.rx*400 +340){
                me.xMove = -me.xMove
            }
            else if (me.x + me.xMove <= me.rx*400 + 40){
                me.xMove = -me.xMove;
            }
            if (me.y + me.yMove >= me.ry*400 + 340){
                me.yMove = -me.yMove
            }
            else if (me.y + me.yMove <= me.ry*400 + 40){
                me.yMove = -me.yMove;
            }
            // Changing the position of the enemy
            me.x += me.xMove;
            me.y += me.yMove;
        
        }
    }
}

class hydraChaseState{
    constructor(){
        this.move = 0.5;
        this.velocity = createVector(1, 1);
    }
    execute(me){
        this.move = 0.5;
        print('chasing')
        if (dist(me.x, me.y, game.player.x, game.player.y) > 150 || game.player.check_collision_with_hydra(0, 0)){
            me.currState = 1;
            
            if (!me.collided && game.player.check_collision_with_hydra(0, 0)){
                // this.frame = frameCount;
                me.collided = true;
            }
        }

        // Death transition to death state to be implemented in main/arrow
        // also check the line of sight of the arrow in order to avoid it
        this.velocity.set(game.player.x - me.x, game.player.y - me.y);
        this.velocity.setMag(1.5);
        // Frame count
        me.index+= 0.12; // move the enemy
        if(me.index >= 3){
            me.index = 0;
        }
        // Checking boundaries
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
        me.xMove = this.velocity.x; //seems redundant
        me.x += this.velocity.x;
        me.y += this.velocity.y;
    }
}


