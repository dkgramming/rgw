function setup() {
  createCanvas(640, 480);
}

function draw() {
  ellipse(50, 50, 80, 80);
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
  display:function () { 
    // TODO
  },
  checkEdges:function () { 
    // TODO
  }
}
