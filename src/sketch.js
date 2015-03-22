var boids = [];
var NUM_BOIDS = 3;

/**
 * P5js initialization
 */
function setup() {

  createCanvas(640, 480);

  for (var i = 0; i < NUM_BOIDS; i++) {
    boids.push(new Boid(
      random(0,width), 
      random(0,height), 
      10,
      10,
      10)
    );
  }

}

/**
 * P5js render loop
 */
function draw() {

  // Paint the background white
  background(255);

  boids.forEach(function(boid) {
    boid.calcSteeringForces();
    boid.update();
    boid.checkEdges();
    boid.display();
  });

}

/**
 * Boid class
 */
function Boid(x_pos, y_pos, mass, maxSpeed, maxForce) {
  this.position= createVector(x_pos, y_pos);
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector(0, 0);
  this.mass = mass;
  this.maxSpeed = maxSpeed;
  this.maxForce = maxForce;
}

Boid.prototype = {

  constructor: Boid,

  update:function () {
    // Update velocity using the acceleration vector the current time step
    this.velocity.add(this.acceleration);

    // Clamp the velocity vector
    if (this.velocity.mag() > this.maxSpeed) { 
      this.velocity.setMag(this.maxSpeed); 
    }
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  },

  display:function () { 
    ellipse(this.position.x, this.position.y, 80, 80);
  },

  checkEdges:function () { 
    if (this.position.x < 0) { this.position.x = width; }
    if (this.position.x > width) { this.position.x = 0; }
    if (this.position.y < 0) { this.position.y = height; }
    if (this.position.y > height) { this.position.y = 0; }
  },

  applyForce:function (force) {
    // Force = mass * acceleration
    // acceleration = Force / mass
    this.acceleration.add(force.copy().div(this.mass));
  },

  seek:function (targetVector) {
    var forwardVector = p5.Vector.add(this.position, this.velocity);
    return steer = p5.Vector.sub(targetVector, forwardVector);
  },

  separate:function (otherBoids, safeDistance) {
    var sum = createVector();
    var count = 0;
    var pos = this.position;
    var steer = createVector();
     
    otherBoids.filter(function(other) {
      var distance = pos.dist(other.position)
      return distance > 0 && distance < safeDistance;
    }).forEach(function(tooClose) {
      var diff = p5.Vector.sub(pos, tooClose.position);
      diff.normalize();
      sum.add(diff);
      count += 1;
    });

    if (count > 0) { 
      sum.div(count); 
      sum.setMag(this.maxSpeed);
      steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
    }

    return steer;
  },

  calcSteeringForces:function () {
    var sepWeight = 0.2;
    var sepForce = this.separate(boids, 100).mult(sepWeight);
    this.applyForce(sepForce);
    
    var seekWeight = 0.5;
    var seekForce = this.seek(createVector(mouseX, mouseY)).mult(seekWeight);
    this.applyForce(seekForce);
  }

}
