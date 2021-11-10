// Creates Harpy Object class which is used to create and move the harpy
class SnakeObj {
    constructor(x, y) {
        this.speed = 1;
        this.index = 0;
        this.x = x;
        this.y = y;
        this.curIndex = 0;
    }
    
    draw(){
        image(   [this.curIndex], this.x, this.y);
    }
    move(){

    }
}


