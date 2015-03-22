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
      50,
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
    var steeringForce = boid.calcSteeringForces();
    boid.applyForce(steeringForce);
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

  this.sepWeight = 5.0;
  this.seekWeight = 0.5;
  this.wanderWeight = 5.2;
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
    if (force.mag() > this.maxForce) { force.setMag(this.maxForce); }

    // Force = mass * acceleration
    // acceleration = Force / mass
    this.acceleration.add(force.copy().div(this.mass));
  },

  forward:function () {
    return p5.Vector.add(this.position, this.velocity);
  },

  seek:function (targetVector) {
    return steer = p5.Vector.sub(targetVector, this.forward());
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

  wander:function () {
    var random = p5.Vector.random2D().mult(50).add(this.forward());
    return this.seek(random);
  },

  calcSteeringForces:function () {
    var steeringForce = createVector();

    var sepForce = this.separate(boids, 200).mult(this.sepWeight);
    steeringForce.add(sepForce);
    
    var seekForce = this.seek(createVector(mouseX, mouseY))
                        .mult(this.seekWeight);
    steeringForce.add(seekForce);

    var wanderForce = this.wander();
    steeringForce.add(wanderForce);
    
    return steeringForce;
  }

}
