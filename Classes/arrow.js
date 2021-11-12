 // Creates Arrow Object class which is used to create and move the arrow
let arrowWidth = 50;
let arrowHeight = 14.29;
class ArrowObj {
// constructor(x, y, angle) {
    constructor(){
        // this.x = x;
        // this.y = y;
        // this.angle = angle;
        this.vec = new p5.Vector(0, -1);
        this.vec.set(cos(this.angle), sin(this.angle));
        
        this.x = 0;
        this.y = 0;
        this.fired = false;
        this.angle = 0;
        this.step = new p5.Vector(1, 1);
    }
    draw() {
        // push();
        // translate(this.x, this.y);
        // rotate(this.angle);

        // image(arrowImg, this.x, this.y, 25, 25);

        // rotate(-this.angle);
        // translate(-this.x, -this.y);
        // pop();

        if(this.fired){
            push();
                translate(this.x, this.y);
                this.step.setMag(2);
                this.step.setHeading(this.angle);
                this.x += this.step.x;
                this.y += this.step.y;
                rotate(this.angle);
                image(arrowCapture, 0, 0, arrowWidth, arrowHeight);
            pop();
            }
    }

    // Sets the direction for the arrow based on the stance of the archer
    setDirection(x, y, direction){
        this.x = x;
        this.y = y;
        switch(direction){
                
            case 'rl':
                this.angle = -PI;   
                break;
                
            case 'ru':
                this.angle = -HALF_PI;
                break;
                
            case 'rr':
                this.angle = 0;   
                break;
                
            case 'rd':
                this.angle = HALF_PI;   
                break;
        }
    }

    check_collision(){
        for(let wall of game.walls){
            let horizontalDistance = abs((this.x + arrowWidth/2 ) - (wall.x + wall.size/2));
            let verticalDistance = abs((this.y + arrowHeight/2 ) - (wall.y + wall.size/2));

            if(verticalDistance < wall_constraint_y && horizontalDistance < wall_constraint_x){
              print(verticalDistance, horizontalDistance);
              print('Player: Collision with wall');
              return true;
        }
    }
}

    
    fall(range) {

    }
}