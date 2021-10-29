function preload(){
  spriteSheet = loadImage('harpy_sprite.png');
}
class harpyObj{
  constructor(x, y, speed){
    this.speed = speed;
    this.index = 0;
    this.x = x;
    this.y = y
    
    
  }
  fly(){
  var curIndex = floor(this.index%flyHarpy.length);
    push();
    // scale(-1, 1);
  // translate(-200, 200);
  // rotate(PI/2);
  
    image(flyHarpy[curIndex],this.x, this.y);
    pop();
  }
  flyAnimate(){
    this.index += this.speed;
    this.x += this.speed*9;
    if (this.x > width){
      this.x = 40;
    }
  }
}
var spriteSheet;
var flyHarpy = [];
var harpy;
function setup() {
  createCanvas(400, 400);
  background(220, 220, 220, 0);
  image(spriteSheet, 0, 200);
  flyHarpy.push(get(5, 340, 65, 45));
  flyHarpy.push(get(70, 340, 70, 45));
  flyHarpy.push(get(140, 340, 50, 45));
  harpy = new harpyObj(200, 200, 0.1);
  
  
}

function draw() {
  background(220);
  
  // line(5, 0, 5, 400);
  // line(70, 0, 70, 400);
  // line(140, 0, 140, 400);
  // line(190, 0, 190, 400);
  // line(0, 210, 400, 210);
  // line(0, 255, 400, 255);
  // line(0, 280, 400, 280);
  // line(0, 320, 400, 320);
  // line(0, 340, 400, 340);
  // line(0, 385, 400, 385);
  // image(flyHarpy[2], 200, 200);
  harpy.fly();
  harpy.flyAnimate();
  
}