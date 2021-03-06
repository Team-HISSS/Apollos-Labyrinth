 // Creates Arrow Object class which is used to create and move the arrow
let arrowWidth = 50;
let arrowHeight = 14.29;
let half_arrowWidth = arrowWidth/2;
let half_arrowHeight = arrowHeight/2;
let numberBal = 0;
class ArrowObj {
    constructor(){
        
        this.vec = new p5.Vector(0, -1);
        this.vec.set(cos(this.angle), sin(this.angle));
        this.direction = 0;
        
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
        
        // Checks if the arrow has been fired
        if(this.fired){
            push();
                // Checks if the arrow has been blocked by any object
                let blocked = false;
                
                // Checking if arrow is blocked by the wall
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

                // Checking if arrow hit the harpy
                for (let harpy of game.harpies){
                    if(!harpy.dead && this.check_collision_with_harpy(harpy)){
                        blocked = true;
                        this.fired = false;
                        harpy.dead = true;
                        game.tm.rooms[game.player.roomNumber].numEnemies -= 1;
                        // switch the enemy to its death state
                        break;
                    }
                }

                // Checking if arrow hit the snake
                for(let snake of game.snakes){
                    if(!snake.dead && this.check_collision_with_snake(snake)){
                        blocked = true;
                        this.fired = false;
                        snake.dead = true;
                        game.tm.rooms[game.player.roomNumber].numEnemies -= 1;
                        // switch the enemy to its death state
                        break;
                    }
                }

                // Checking if arrow hit the balista
                for(let balista of game.balistas){
                    if(!balista.dead && this.check_collision_with_balista(balista)){
                        blocked = true;
                        this.fired = false;
                        balista.numHits += 1;
                        // If the hits is greater than or equal to 3,
                        // balista dies
                        if (balista.numHits >= 2){
                            balista.state = 3;
                            numberBal++;
                            // print('Balistas ' + numberBal);
                            game.tm.rooms[game.player.roomNumber].numEnemies -= 1;
                            break;
                        }
                        // switch the enemy to its death state
                    }
                }

                // Checking if arrow hit the hydra
                for(let hydra of game.hydras){
                    if(!hydra.dead && this.check_collision_with_hydra(hydra)){
                        blocked = true;
                        this.fired = false;
                        hydra.hit += 1;
                        // If the hits is greater than or equal to 5,
                        // hydra dies
                        if (hydra.hit >= 5){
                            hydra.dead = true;
                            game.tm.rooms[game.player.roomNumber].numEnemies -= 1;
                            // switch the enemy to its death state
                            break;
                        }
                    }
                }
                
                // Checks if the arrow has not been blocked,
                // then keeps moving
                if(!blocked){
                    translate(this.x, this.y);
                    this.step.setMag(3);
                    this.step.setHeading(this.angle);
                    
                    // Updates after image is drawn
                    this.x += this.step.x;
                    this.y += this.step.y;
                    rotate(this.angle);

                    image(arrowCapture, -25, -7.5, arrowWidth, arrowHeight);
                }
                // Only for developers!
                //fill(255,255,0);
                //ellipse(0,0,10,10);
                pop();
            }
    }

    // Checking if a arrow is in an enemy's line of sight
    los(x, y, ind) { 
        var projectiony = 0; // projected y position of the arrow
        var projectionx = 0; // projected x position of the arrow 
        
        // Check for los only if the arrow is fired
        if (this.fired) {

          // Need to change the angle depending on the direction in which the arrow is shot, 4 if conditions
          projectiony = tan(this.angle + HALF_PI) * (x - this.x) + this.y; // get the projected y location using y = mx +c
          projectionx = (y - this.y) / tan(this.angle + HALF_PI) + this.x; // get the projected x location using x = (y-c)/m
          
          // Checks if the distance between the projected coordinates and the actual coordinates is less than 90, 
          // then the arrow is in sight
          if (dist(x, y, projectionx, projectiony) < 90) { 
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    // Sets the direction for the arrow based on the stance of the archer
    setDirection(x, y, direction){
        this.x = x;
        this.y = y;
        this.direction = direction;
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

    // Checks collision with the wall or door
    check_collision(boundary){
    
        let horizontalDistance = abs((this.x) - (boundary.x + wall_center_radius));
        let verticalDistance = abs((this.y) - (boundary.y + wall_center_radius));
        
        if(verticalDistance < wall_center_radius + 2 && horizontalDistance < wall_center_radius + 2){
            
        //   print('Arrow: Collision with boundary');
            return true;
        }
        return false;
    }

    // Check collision with the harpy
    check_collision_with_harpy(enemy){
        
        let horizontalDistance = abs((this.x) - (enemy.x + harpy_center_radius));
        let verticalDistance = abs((this.y) - (enemy.y + harpy_center_radius));
        // print('Enemy.x ' + enemy.x)
        if(verticalDistance < this.enemy_constraint_y + harpy_center_radius/2 - 5 && horizontalDistance < this.enemy_constraint_x + harpy_center_radius/2 - 10){
        //   print('Arrow: Collision with harpy');
            return true;
        }
        return false;
    }

    // Check collision with the snake
    check_collision_with_snake(enemy){
        
        if(dist(this.x, this.y, enemy.x, enemy.y) < 20){
            return true;
        }
        return false;
    }

    // Check collision with the balista
    check_collision_with_balista(enemy){
        
        if (dist(enemy.x, enemy.y, this.x, this.y) < 40) {
            return true;
        }
        return false;
    }

    // Check collision with the hydra
    check_collision_with_hydra(enemy){
        
        let horizontalDistance = abs((this.x) - (enemy.x));
        let verticalDistance = abs((this.y) - (enemy.y));
        
        if(verticalDistance < hydra_constraint_y && horizontalDistance < hydra_constraint_x){
        //   print('Arrow: Collision with snake');
          return true;
        }
        return false;
    }

}