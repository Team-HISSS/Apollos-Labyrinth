// Creates Name Object class which is used to display a moving 
// sequence of names of the authors of the game
class NameObj{
    constructor(x, y){
    this.x = x;
    this.y = y;
    }
    draw(){
    push();
        textSize(18);
        fill(0);  
        stroke(0);
        text("By Skyler Smith, Shlok Aggarwal, Sarang Rajeev", this.x, this.y)
    pop();
    this.move();
    }
    move(){
    this.x -= 1;
    if(this.x < -400){
        this.x = 400;
    }
    }
}

