function Scoreboard(){
	this.score = 0;
	this.lives = 3;
	this.pos = createVector(50,200);
	
	this.render = function(){
		pop()
		noStroke();
		fill(255);
		text("Score: " + this.score, this.pos.x,this.pos.y);
		text("Lives: " + this.lives, this.pos.x,this.pos.y+15);
		push();
	}

	this.updateScore = function (amt){
		this.score += amt;
	}

	this.playerDeath = function (){
		this.lives--;
	}

}
