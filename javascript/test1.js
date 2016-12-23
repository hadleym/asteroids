var ship;
var asteroids = [];
var lasers = [];
function setup() {
	numOfAsteroids = 10;
	createCanvas(windowWidth-100, windowHeight-100);
	ship = new Ship();
	for ( i = 0; i < numOfAsteroids; i++){
		asteroids.push(new Asteroid());
	}
	scoreboard = new Scoreboard();
}
function keyPressed(){
	if (keyCode == RIGHT_ARROW){
		ship.turnRight();
		ship.setRotation(.1); 
	} else if (keyCode == LEFT_ARROW){
		ship.turnLeft();
		ship.setRotation(-.1);
	} else if (keyCode == UP_ARROW){
	
		ship.boosting= true;
	} else if (key == ' ' ){
		lasers.push(new Laser(ship.pos, ship.heading));
	}
}

function keyReleased(){
	if (keyCode == UP_ARROW){
		ship.boosting=false;
	} else if ( keyCode == RIGHT_ARROW){
		ship.stopTurnRight();
	} else if ( keyCode == LEFT_ARROW){
		ship.stopTurnLeft();
	}
}



function draw() {
	background(0);
	scoreboard.render();
	ship.turn();
	ship.update();
	ship.edges();
	
	for (var i = 0; i < asteroids.length; i++){
		asteroids[i].render();
		asteroids[i].update();
	}
	
	for (var i = lasers.length-1; i>=0 ;i--){
		laserHit = false;
		lasers[i].render();
		lasers[i].update();
		for (var j = asteroids.length-1; j >= 0; j--){
			if (lasers[i].hits(asteroids[j])){
				laserHit = true;
				newA = asteroids[j].breakup();
				if (newA != null){
					asteroids = asteroids.concat(newA);
				}
				asteroids.splice(j,1);
				lasers.splice(i,1);
				break;
			}
		}
	}
	
	if (ship.hitsAsteroid(asteroids)){
		//console.log("YOU HIT AN ASTEROID");
	}
	ship.render();
}


