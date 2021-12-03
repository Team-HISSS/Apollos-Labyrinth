// Creates Hydra Object class which the is used to create and move the hydra
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

    // Drawing the hydra frames
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
    
    // Spawns snakes from the hydra
    spawnSnakes(){
        // Spawns snakes at every 180 frames i.e. 3 seconds
        if(frameCount % 180 == 0){
            game.snakes.push(new SnakeObj(this.x, this.y, this.rx, this.ry));
            // Adds the snake to the total enemy count for the room
            game.tm.rooms[game.player.roomNumber].numEnemies += 1;
        }

    }
}

// Wander state for the Hydra
class hydraWanderState{
    constructor(){
        this.away = false;
    }
    // executing the wander state
    execute(me){ 
        
        // Checks if the hydra collided with the archer
        if (me.collided){
            // Checks if the hydra is not away from the archer
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

            // Checks if the hydra beyond the collision distance from the archer
            if(dist(me.x, me.y, game.player.x + game.player.w/2, game.player.y+ game.player.h/2) > 190){
                me.collided = false;
            }

        }
        else {
            this.away = false;
            // Checks if the distance between any enemy and the player is less than 150 pixels, 
            // then switch to chase state
            if (dist(me.x, me.y, game.player.x + game.player.w/2, game.player.y+ game.player.h/2) <= 150){ 
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

// Chase state for the Hydra
class hydraChaseState{
    constructor(){
        this.move = 0.5;
        this.velocity = createVector(1, 1);
    }
    execute(me){
        this.move = 0.5;
        if (dist(me.x, me.y, game.player.x + game.player.w/2, game.player.y+ game.player.h/2) > 150 || game.player.check_collision_with_hydra(0, 0)){
            me.currState = 1;
            
            if (!me.collided && game.player.check_collision_with_hydra(0, 0)){
                //game.player.health--;
                me.collided = true;
            }
        }

        // Death transition to death state to be implemented in main/arrow
        // also check the line of sight of the arrow in order to avoid it
        this.velocity.set((game.player.x + game.player.w/2) - me.x, (game.player.y+ game.player.h/2) - me.y);
        this.velocity.setMag(2);
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


