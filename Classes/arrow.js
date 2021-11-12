 // Creates Arrow Object class which is used to create and move the arrow
let arrowWidth = 50;
let arrowHeight = 14.29;
let half_arrowWidth = arrowWidth/2;
let half_arrowHeight = arrowHeight/2;
let wall_center_radius = 10;

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
        this.constraint_x = 0;
        this.constraint_y = 0;
        this.centerX = 0;
        this.centerY = 0;
    }
    draw() {
        // push();
        // translate(this.x, this.y);
        // rotate(this.angle);

        // image(arrowImg, this.x, this.y, 25, 25);

        // rotate(-this.angle);
        // translate(-this.x, -this.y);
        // pop();
        // if(this.x > 900){
        //     this.fired = false;
        // }

        if(this.fired){
            push();
                let blocked = false;
                for (let wall of game.walls){
                    if(this.check_collision(wall)){
                        blocked = true;
                        this.fired = false;
                        break;
                    }
                }
                // Blocked by door when closed and open
                for (let door of game.doors){
                    if(this.check_collision(door)){
                        blocked = true;
                        this.fired = false;
                        break;
                    }
                }

                for (let harpy of game.harpies){
                    if(!harpy.dead && this.check_collision_with_enemy(harpy)){
                        blocked = true;
                        this.fired = false;
                        break;
                    }
                }
                
                if(!blocked){
                    translate(this.x, this.y);
                    this.step.setMag(2);
                    this.step.setHeading(this.angle);
                    // Updates after image is drawn
                    this.x += this.step.x;
                    this.y += this.step.y;
                    rotate(this.angle);
                    image(arrowCapture, 0, 0, arrowWidth, arrowHeight);
                }
            pop();
            }
    }

    // Sets the direction for the arrow based on the stance of the archer
    setDirection(x, y, direction){
        this.x = x;
        this.y = y;
        switch(direction){
                
            case 'rl':
                this.angle = PI;   
                this.centerX = this.x - half_arrowWidth;
                this.centerY = this.y - half_arrowHeight;
                this.wall_constraint_x = half_arrowWidth + 40; // Added for separate consideration
                this.wall_constraint_y = half_arrowHeight;

                this.enemy_constraint_x = half_arrowWidth;
                this.enemy_constraint_y = half_arrowHeight;
                break;
                
            case 'ru':
                this.angle = PI + HALF_PI;
                this.centerX = this.x + half_arrowHeight;
                this.centerY = this.y - half_arrowWidth;
                this.wall_constraint_x = half_arrowHeight;
                this.wall_constraint_y = half_arrowWidth + 20; // Added for separate consideration

                this.enemy_constraint_x = half_arrowHeight;
                this.enemy_constraint_y = half_arrowWidth;
                break;
                
            case 'rr':
                this.angle = 0;   
                this.centerX = this.x + half_arrowWidth;
                this.centerY = this.y + half_arrowHeight;
                this.wall_constraint_x = half_arrowWidth;
                this.wall_constraint_y = half_arrowHeight;

                this.enemy_constraint_x = half_arrowWidth;
                this.enemy_constraint_y = half_arrowHeight;
                break;
                
            case 'rd':
                this.angle = HALF_PI;   
                this.centerX = this.x - half_arrowHeight;
                this.centerY = this.y + half_arrowWidth;
                this.wall_constraint_x = half_arrowHeight;
                this.wall_constraint_y = half_arrowWidth + 10; // Added for separate consideration

                this.enemy_constraint_x = half_arrowHeight;
                this.enemy_constraint_y = half_arrowWidth;
                break;
        }
    }

    check_collision(boundary){
        // for(let wall of game.walls){
        // for(let i = 0; i < game.walls.length; i++){
            let horizontalDistance = abs((this.x + half_arrowWidth) - (boundary.x + wall_center_radius));
            let verticalDistance = abs((this.y + half_arrowHeight) - (boundary.y + wall_center_radius));
            
            if(verticalDistance < this.wall_constraint_y + wall_center_radius && horizontalDistance < this.wall_constraint_x + wall_center_radius){
              
              print('Arrow: Collision with boundary');
              return true;
        }
        return false;
    }

    check_collision_with_enemy(enemy){
            let horizontalDistance = abs((this.x + half_arrowWidth) - (enemy.x + wall_center_radius));
            let verticalDistance = abs((this.y + half_arrowHeight) - (enemy.y + wall_center_radius));
            print('Enemy.x ' + enemy.x)
            if(verticalDistance < this.enemy_constraint_y && horizontalDistance < this.enemy_constraint_x){
              
              print('Arrow: Collision with enemy');
              return true;
        }
        return false;
    }

    
    fall(range) {

    }
}