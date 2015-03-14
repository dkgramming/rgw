function setup() {
  createCanvas(640, 480);
}

function draw() {
  ellipse(50, 50, 80, 80);
}

/**
 * Boid class
 */
function Boid() {
  this.location = createVector();
  this.velocity = createVector();
  this.acceleration = createVector();
  this.mass = 0;
}
