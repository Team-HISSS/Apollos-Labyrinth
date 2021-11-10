 // Creates Arrow Object class which is used to create and move the arrow
 class ArrowObj {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.vec = new p5.Vector(0, -1);
        this.vec.set(cos(this.angle), sin(this.angle));
    }
    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
  
        image(arrowImg, this.x, this.y, 25, 25);
  
        rotate(-this.angle);
        translate(-this.x, -this.y);
        pop();
    }
    fall(range) {
  
    }
  }