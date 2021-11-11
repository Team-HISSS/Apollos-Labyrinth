// Creates Harpy Object class which is used to create and move the harpy
class HarpyObj {
    constructor(x, y, rx, ry) {
        this.rx = rx;
        this.ry = ry;
        this.speed = 1;
        this.index = 0;
        this.x = x;
        this.y = y;
    }
    
    draw(){
        // print("HERE: " + str(flyHarpy.length));
        var translatex = this.rx*400;
        var translatey = this.ry*400;
        push();
        translate(translatex, translatey);
        image(flyHarpy[int(this.index)], this.x, this.y);
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
            this.x = -10;
        }
    }
}


