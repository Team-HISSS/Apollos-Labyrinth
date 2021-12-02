class BalistaObj{
    constructor(x, y, ind) {
        this.index = ind;
        this.x = x;
        this.y = y;
        this.initAngle = random(0, 2 * PI);
        this.angle = this.initAngle;
        this.vec = createVector(0, 0);
        this.angleDir = 0;
        this.bullet = [new bulletObj(this.x, this.y, this.angle)];
        this.states = [new BalistaShootState(), new BalistaChaseState(), new BalistaAvoidState(), new BalistaDeathState()]; // different state objects of the tank
        this.state = 0;
        this.blast = new fireworkObj(2);
        this.dead = false;
        this.scored = false;
        this.particle =[];
      }
}
