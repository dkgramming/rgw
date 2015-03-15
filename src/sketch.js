var boids = [];

/**
 * P5js initialization
 */
function setup() {

  createCanvas(640, 480);

  for (var i = 0; i < 10; i++) {
    boids.push(new Boid(10*i, 10*i, 10));
  }

}

/**
 * P5js render loop
 */
function draw() {

  boids.forEach(
    Boid.prototype.display
  );

}

/**
 * Boid class
 */
function Boid(x_pos, y_pos, mass) {
  this.position= createVector(x_pos, y_pos);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.mass = mass;
}

Boid.prototype = {
  constructor: Boid,
  update:function () {
    // TODO
  },
  display:function (self) { 
    ellipse(self.position.x, self.position.y, 80, 80);
  },
  checkEdges:function () { 
    // TODO
  }
}
