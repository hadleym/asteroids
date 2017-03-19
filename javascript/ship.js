function Ship() {
	this.pos = createVector(width/2, height/2);
	this.r = 10;
	this.heading = 0;
	this.rotation = 0;
	this.vel = createVector(0,0);
	this.acc = .1;
	this.drag = .99;
	this.boosting = false;
	this.isTurningLeft = false;
	this.isTurningRight = false;
	
	this.render = function(){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading + PI/2);
		fill(0);
		stroke(255);
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
		pop();
	}

	this.hitsAsteroid = function(asteroids){
		for ( i = 0; i < asteroids.length; i++){
			if (this.hit(asteroids[i])){
				return true;
			}
		}
		return false;
	}
	
	this.hit = function(asteroid){
		var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		if (d < this.r + asteroid.r) {
			return true;
		} else { 
			return false;
		}
	}
	this.thrust = function() {
		var force = p5.Vector.fromAngle(this.heading);
		force.mult(this.acc);
		this.vel.add(force);
	}

	this.setRotation = function(a) {
		this.rotation = a;
	}

	this.turn = function() {
		this.rotation = 0;
		if ( this.isTurningLeft ) {
			this.rotation+=-.1;
		} else if ( this.isTurningRight){
			this.rotation +=.1;
		}
		this.heading+= this.rotation;
	}
	
	this.isBoosting = function(){
		return this.boosting;
	}
	
	this.edges = function(){ 
		if (this.pos.x > width) {
			this.pos.x = 0;
		} else if (this.pos.x < 0) {
			this.pos.x = width - this.r;
		}
	
		if (this.pos.y > height) {
			this.pos.y = 0;
		} else if (this.pos.y < 0) {
			this.pos.y = height - this.r;
		}
	}
		
	this.update = function() {
		if (this.isBoosting()) { 
			this.thrust();
		}
		this.pos.add(this.vel);
		this.vel.mult(this.drag);
	}
	
	this.turnRight =function(){
		this.isTurningRight = true;
	}
	
	this.turnLeft = function() {
		this.isTurningLeft = true;
	}
	
	this.stopTurnRight = function() {
		this.isTurningRight = false;
	}

	this.stopTurnLeft = function() {
		this.isTurningLeft = false;
	}
}
