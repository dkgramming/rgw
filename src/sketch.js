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

  // Paint the background white
  background(255);

  var gravity = createVector(0, 0.1);

  boids.forEach(function(boid) {
    boid.applyForce(gravity);
    boid.update();
    boid.display();
  });

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
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  },
  display:function () { 
    ellipse(this.position.x, this.position.y, 80, 80);
  },
  checkEdges:function () { 
    // TODO
  },
  applyForce:function (force) {
    // Force = mass * acceleration
    // acceleration = Force / mass
    this.acceleration.add(force.copy().div(this.mass));
  }
}
