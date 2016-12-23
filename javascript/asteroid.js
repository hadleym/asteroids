
function Asteroid(pos, r){
	if (pos)
		this.pos = pos.copy();
	else
		this.pos = createVector(random(width), random(height));

	if (r)
		this.r = r/2;
	else
		this.r = floor(random(10,50));
		
	this.sides = floor(random(5,15));
	this.offsetTollerance = this.r/2;
	this.offsets = [];
	this.vel = p5.Vector.random2D();
	for ( var i = 0; i < this.sides; i++){
		this.offsets[i] = random(-this.offsetTollerance, this.offsetTollerance);
	}
	
	this.update = function(){
		this.pos.add(this.vel);
		this.edge();
	}

	this.edge = function(){
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
		
	this.breakup = function(){
		if (this.r < 15)
			return null;

		var newA = [];
		newA[0] = new Asteroid(this.pos,this.r);
		newA[1] = new Asteroid(this.pos, this.r);
		return newA;	
	}
	this.render = function(){ 
		push();
		stroke(255);
		noFill();
		translate(this.pos.x, this.pos.y);
//		ellipse(0,0, this.r * 2);	
		beginShape();
		for ( i = 0; i < this.sides; i++){
			var angle = map(i,0,this.sides,0,TWO_PI);
			var o = this.r + this.offsets[i];
			var x = o * cos(angle);
			var y = o * sin(angle);
			vertex(x,y);
		}
		endShape(CLOSE);
		pop();
	}
}
