// Creates Harpy Object class which is used to create and move the harpy
class SnakeObj {
    constructor(x, y, rx, ry, roomNum){
        this.x = x;
        this.y = y;
        this.rx = rx; 
        this.ry = ry; 
        this.dead = false; // Changed from isAlive = true 
        this.speed = 1;
        this.roomNum = roomNum;
        //direction can be 0, 1, 2, 3. 
        //1,2,3,4 = facing right, left, up, down
        this.index = 0;  
        this.direction = "r"; 
        this.scalex = 0; 
        this.scaley = 0; 
        //this.state = [new MoveState(), new SnakeWanderState(), new SnakeChaseState()];
        this.state = [new DirectionState(), new SnakeWanderState(), new SnakeChaseState()]; //, new SnakeChaseState()];
        this.randDir = 0; 
        this.randDist = 0; 
        this.currState = 0;
        this.c = 0; 
    }
    
    draw(){
        if(this.direction == "r")
        {
            this.scalex = -1;
            this.scaley = 1; 
        }
        else if(this.direction == "l"){
            this.scalex = 1;
            this.scaley = 1; 
        }
        else if(this.direction == "u"){
            this.scalex = 1;
            this.scaley = 1;  
        }
        else if(this.direction == "d"){
            this.scalex = 1;
            this.scaley = -1; 
        }

        if(frameCount % 10 == 0){
            this.index++; 
            if((this.direction == "r" || this.direction == "l") && this.index >= 3 ){
                this.index = 0; 
            }
            else if((this.direction == "u" || this.direction == "d") && this.index >= 5){
                this.index = 3;
            }
        }

        //draw at correct angle
        if(!this.dead){ // this.isAlive
            push();
                translate(this.x + 15 , this.y + 15);
                scale(this.scalex, this.scaley);
                image(snakeAnimations[this.index], -15, -15, 30, 30);
                //fill(255,255,0);
                //ellipse(0,0,5,5);
                scale(-this.scalex, -this.scaley);
                translate(-this.x - 15, -this.y - 15); 
            pop();
        }
    }

    
    snakeEndMove(){
        if(this.randDist <= 0){
            this.randDist = 80;
            if(this.direction == "r"){
                this.direction = "l";
            } 
            else{
                this.direction = "r";
            }
        }

        if(this.direction == "r"){
            this.x++;
        }
        else{
            this.x--; 
        }

        this.randDist--; 
        

    }
    
}

// class MoveState{
//     constructor(){}

//     execute(me){
//         me.y += me.speed; 
//         me.direction = 3;


//     }
// }
//sets random direction 
class DirectionState{
    constructor(){}
    execute(me){
        var randDir = random(0,4);
        randDir = int(randDir); 
        me.randDist = random(30,50);
        if(randDir == 0){
            me.direction = "r";
        }
        else if(randDir == 1){
            me.direction = "l";
        }
        else if(randDir == 2){
            me.direction = "u";
        }
        else if(randDir == 3){
            me.direction = "d"; 
        }
        else{
            me.direction = "r";
        }
        
        //print("Direction State: " + randDir);
        me.currState = 1; 
    }
}

class SnakeWanderState{ // To make any enemy wander around in the room
    constructor(){}
    execute(me){
        if (game.player.roomNumber == me.roomNum){
            switch (me.direction) {
                case "r":
                    if(me.x + 5 >= me.rx*400 +350){
                        me.direction = "l";
                    }
                    else{
                        me.x++; 
                    }
                    break;
                case "l":
                    if(me.x - 5 <= me.rx*400 + 30){
                        me.direction = "r";
                    }
                    else{
                        me.x--; 
                    }
                    break;
                case "d":
                    if(me.y + 5 >= me.ry * 400 + 350){
                        me.direction = "u";
                    }
                    else{
                        me.y++; 
                    }
                    break;
                case "u":
                    if(me.y - 5 <= me.ry*400 + 30){
                        me.direction = "d";
                    }
                    else{
                        me.y--; 
                    }
                    break;
            }
            me.randDist--; 

            if(abs(me.x - game.player.x - game.player.w/2) < 2) {
                me.currState = 2;
                //print("GO LEFT" + me.x + " -- " + game.player.x + game.player.w/2 );
                if(me.y > game.player.y + game.player.h/2){
                    me.direction = "u";
                }
                else if(me.y <= game.player.y + game.player.h/2){
                    me.direction = "d";
                    //print("GO RIGHT");
                }
            }
            else if(abs(me.y - game.player.y - game.player.h/2) < 2){
                me.currState = 2;
                if(me.x > game.player.x + game.player.w/2){
                    me.direction = "l";
                }
                else if(me.x <= game.player.x + game.player.w/2){
                    me.direction = "r";
                }
            }

            if(me.randDist <= 0){
                me.currState = 0; 
            }
        }

    }
}

class SnakeChaseState{ // To make any enemy wander around in the room
    constructor(){}
    execute(me){ 
        //print("Chase state");
        if(me.direction == "r"){
            me.x += 2.5;
            if(me.x + 5 >= me.rx*400 +340){
                me.direction = "l";
                me.currState = 0; 
            }
        }
        else if(me.direction == "l"){
            me.x -= 2.5;
            if(me.x - 5 <= me.rx*400 + 40){
                me.direction = "r";
                me.currState = 0; 
            }
        }
        else if(me.direction == "u"){
            me.y -= 2.5;
            if(me.y - 5 <= me.ry*400 + 30){
                me.direction = "d";
                me.currState = 0; 
            }
        }
        else if(me.direction == "d"){
            me.y += 2.5;
            if(me.y + 5 >= me.ry * 400 + 340){
                me.direction = "u";
                me.currState = 0; 
            }
        }
        //me.currState = 0; 
    }


}

