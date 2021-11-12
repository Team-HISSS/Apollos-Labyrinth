// Creates Harpy Object class which is used to create and move the harpy
class SnakeObj {
    constructor(x, y) {
        this.speed = 1;
        this.index = 0;
        this.x = x;
        this.y = y;
        this.state = [new WanderState(), new ChaseState()];
        this.currState = 0;
    }
    
    draw(){
        push();
        image(snakeSheet[this.index], this.x, this.y);
        pop();
    }
    move(){
        this.x += this.speed; 
    }

    update(){
        
    }
    
}


