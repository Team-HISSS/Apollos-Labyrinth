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