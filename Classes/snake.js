// Creates Harpy Object class which is used to create and move the harpy
class SnakeObj {
    constructor(x, y, rx, ry){
        this.x = x;
        this.y = y;
        this.rx = rx; 
        this.ry = ry; 
        this.isAlive = true; 
        this.speed = 1;
        //direction can be 0, 1, 2, 3. 
        //1,2,3,4 = facing right, left, up, down
        this.index = 0;  
        this.direction = 0; 
        this.scalex = 0; 
        this.scaley = 0; 
        //this.state = [new MoveState(), new SnakeWanderState(), new SnakeChaseState()];
        this.state = [new SnakeWanderState()]//, new SnakeChaseState()];
        this.randDir = 0; 
        this.randDist = 0; 
        this.currState = 0;
    }
    
    draw(){
        if(this.direction == 0)
        {
            this.scalex = -1;
            this.scaley = 1; 
        }
        else if(this.direction == 1){
            this.scalex = 1;
            this.scaley = 1; 
        }
        else if(this.direction == 2){
            this.scalex = 1;
            this.scaley = 1;  
        }
        else if(this.direction == 3){
            this.scalex = 1;
            this.scaley = -1; 
        }

        if(frameCount % 10 == 0){
            this.index++; 
            if((this.direction == 0 || this.direction == 1) && this.index >= 3 ){
                this.index = 0; 
            }
            else if((this.direction == 2 || this.direction == 3) && this.index >= 5){
                this.index = 3;
            }
        }

        //draw at correct angle
        if(this.isAlive){
            push();
            translate(this.x + 15 , this.y + 15);
            scale(this.scalex, this.scaley);
            image(snakeAnimations[this.index], -15, -15, 30, 30);
            scale(-this.scalex, -this.scaley);
            translate(-this.x - 15, -this.y - 15); 
            pop();
        }
    }
    
}

class MoveState{
    constructor(){}

    execute(me){
        me.y += me.speed; 
        me.direction = 3;


    }
}

class SnakeWanderState{ // To make any enemy wander around in the room
    constructor(){}
    execute(me){ // executing the wander state 
        //choose random direction
        if(me.randDist <= 0){ 
            //print("HERE");
            me.randDir = int(random(0,4));
            me.randDist = int(random(15,25));
            if(me.randDir == 0){ 
                me.direction = 0; 
                me.speed = 1;
            }
            else if(me.randDir == 1){
                me.direction = 1; 
                me.speed = -1; 
            }
            else if(me.randDir == 2){
                me.direction = 2; 
                me.speed = -1;
            }
            else if(me.randDir == 3){ 
                me.direction = 3; 
                me.speed = 1;

            }
        }

        //print("Direction: " + me.randDir + " dist " + me.randDist + " " + me.x + " , " + me.y);

        // Moving the enemy around in the map
        if (me.direction == 0 && me.x + 2 >= me.rx*400 + 340){
            me.speed = -me.speed;
            me.direction = 1;
        }
        else if (me.direction == 1 && me.x - 2 <= me.rx*400 + 40){
            me.speed = -me.speed;
            me.direction = 0;
        }
        if (me.direction == 3 && me.y - 2 >= me.ry*400 + 340){
            me.speed = -me.speed;
            me.direction = 2;
        }
        else if (me.direction == 2 && me.y + 2 <= this.ry*400 + 40){
            me.speed = -me.speed;
            me.direction = 3;
        }
        // Changing the position of the enemy
        
        if(me.direction == 0){
            me.x += me.speed;
            me.randDist--; 
        }
        else if(me.direction == 1){
            me.x += me.speed; 
            me.randDist--; 
        }
        else if(me.direction == 2){
            me.y += me.speed;
            me.randDist--; 
        }
        else if(me.direction == 3){
            me.y += me.speed; 
            me.randDist--;  
        }

                //change to chase state
        //print("PLayer " + game.player.x + " snake " + me.x);
        if (abs(me.x - (game.player.x + game.player.w)) < 2){
            //print("Change state");
            if(me.y >= (game.player.y + game.player.h)){
                me.direction = 2; 
            }
            else if(me.y < (game.player.y + game.player.h)){
                me.direction = 3;
            }

            //me.currState = 1;
        }
        if(abs(me.y - (game.player.y + game.player.h)) < 2){
            //print("Change state");
            if(me.x >= (game.player.x + game.player.w)){
                me.direction = 1; 
            }

            else if (me.x < (game.player.x + game.player.w)){
                me.direction = 0;
            }

          //  me.currState = 1;
        }

    }       
}

class SnakeChaseState{ // To make any enemy wander around in the room
    constructor(){}
    execute(me){ 

        //move in same direction until it hits a wall
        if(me.direction == 0){
            me.x += 3 * me.speed; 
        }
        else if(me.direction == 1){
            me.x -= 3 * me.speed; 
        }
        else if(me.direction == 2){
            me.y -= 3 * me.speed; 
        }
        else if(me.direction == 3){
            me.y += 3 * me.speed; 
        }

        //print("dir " + me.direction + " x " + me.x + " y " + me.y + " state " + me.currState);

        //once it hits the walls, it goes back to wander
        print("rx" + this.rx);
        print("ry " + this.ry);

        if (me.x + 2 >= me.rx*400 + 340){
            me.currState = 0;
            me.speed = -me.speed; 
        }
        else if (me.x - 2 <= me.rx*400 + 40){
            me.currState = 0;
            me.speed = -me.speed; 
        }
        if (me.y + 2 >= me.ry*400 + 340){
            me.currState = 0;
            me.speed = -me.speed; 
        }
        else if (me.y - 2 <= me.ry*400 + 40){
            me.currState = 0;
            me.speed = -me.speed; 
        }
    }

}

