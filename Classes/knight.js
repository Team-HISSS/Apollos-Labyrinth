// Creates Knight Object class which is used to create and move the knight
class knightObj {
    constructor(x, y, speed) {
        this.speed = speed;
        this.index = 0;
        this.x = x;
        this.y = y
    }
    run() {
        var curIndex = floor(this.index % runAnimation.length);
        push();
        scale(-1, 1);
        // translate(-200, 200);
        // rotate(PI/2);
  
        image(runAnimation[curIndex], this.x, this.y);
        pop();
    }
    runAnimate() {
        this.index += this.speed;
        this.x -= this.speed * 5;
        if (this.x < -width) {
            this.x = 126;
        }
    }
  }