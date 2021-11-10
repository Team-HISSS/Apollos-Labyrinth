// Creates Harpy Object class which is used to create and move the harpy
class HarpyObj {
    constructor(x, y, speed) {
        this.speed = speed;
        this.index = 0;
        this.x = x;
        this.y = y;
        this.curIndex = 0;
    }
    
    draw(){
        
        image(flyHarpy[this.curIndex], this.x, this.y);
    }

    fly() {
        var curIndex = floor(this.index % flyHarpy.length);
        push();
        // scale(-1, 1);
        // translate(-200, 200);
        // rotate(PI/2);

        image(flyHarpy[curIndex], this.x, this.y);
        pop();
    }
    flyAnimate() {
        this.index += this.speed;
        this.x += this.speed * 9;
        if (this.x > width) {
            this.x = -10;
        }
    }
}