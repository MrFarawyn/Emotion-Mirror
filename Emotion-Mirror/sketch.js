//Partikelparameter
let num = 500;
let particles = [num];
let flow;
let size = 8;

// Bewegungsparameter
let d = 1;
let noiseScale = 500;
let noiseStrength = 1;

// Farben der Emotionen
let rectR = 0;
let rectG = 0;
let rectB = 0;

let rectR2 = 0;
let rectG2 = 0;
let rectB2 = 0;

let rectR3 = 0;
let rectG3 = 0;
let rectB3 = 0;

// Alphakanäle der 3 Farben einer Emotion
let alpha = 255;
let alpha2 = 255;
let alpha3 = 255;

// Farbe 
let shadowCol;

// Counter um die Generierten Partikel in drei Farben aufzuteilen
let updateCounter = 0;

// Variablen zur Emotionsprüfung
let emoCounter = 0;
let trueEmotion = undefined;
let prevEmotion = undefined;




function setup() {

	//Canvas Flowfield
	flow = createCanvas(1280, 720);
	flow.id('flow');
	flow.parent("wrapper");
	background(color(20, 20, 20));
	noStroke();

	//Erstellung der Ellipsen in einem Array
	for (let i = 0; i < num; i++) {

		var loc = createVector(random(width * 1.2), random(height), size);
		var angle = 0;
		var dir = createVector(cos(angle), sin(angle));
		var speed = random(0.5, 2);
		particles[i] = new Particle(loc, dir, speed);

	}
}

function draw() {

	checkEmotion();

	//leicht Transparenter Hintergrund, lässt die Spuren des Flowfields verschwinden
	fill(0, 0, 0, 8);
	rect(0, 0, 1280, 720);
	noStroke();

	//erzeugt Glow um die Partikel
	push();
	canvas.getContext('2d').shadowBlur = 10;
	drawingContext.shadowColor = shadowCol;

	//bewegt Partikel
	for (let i = 0; i < particles.length; i++) {
		particles[i].run();
	}
	pop();

	prevEmotion = curEmotion;

}

//greift auf Globale Variable curEmotion zu, in der die von face-api.js ausgelesene Emotion gespeichert wird
function checkEmotion() {

	// verhindert zu schnelles hin und her wechseln der Emotionen
	if (curEmotion == prevEmotion) {
		emoCounter++;
	}

	if (emoCounter >= 60) {
		if (curEmotion == "neutral") {
			trueEmotion = undefined;
		}

		trueEmotion = curEmotion;
		emoCounter = 0;
	}


	//emotionscheck und zuweisung der Farben und anderer Parameter
	if (trueEmotion == "neutral") {

		//Farben und Alphakanäle der Partikel
		rectR = 150;
		rectG = 255;
		rectB = 255;

		rectR2 = 135;
		rectG2 = 206;
		rectB2 = 250;

		rectR3 = 255;
		rectG3 = 255;
		rectB3 = 255;

		alpha = 0;
		alpha2 = 255;
		alpha3 = 255;

		//Glowfarbe
		shadowCol = color('rgba(224, 255, 255, 0.6)');

		//Bewegungsparameter
		noiseStrength = 1;
		d = 0.8;


	} else if (trueEmotion == "happy") {

		rectR = 0;
		rectG = 250;
		rectB = 154;

		rectR2 = 127;
		rectG2 = 255;
		rectB2 = 0;

		rectR3 = 203;
		rectG3 = 250;
		rectB3 = 93;

		alpha = 255;
		alpha2 = 255;
		alpha3 = 255;

		shadowCol = color('rgba(135, 206, 250, 1)');

		noiseStrength = 2;
		d = 1.5;


	} else if (trueEmotion == "sad") {

		rectR = 0;
		rectG = 0;
		rectB = 205;

		rectR2 = 0;
		rectG2 = 191;
		rectB2 = 255;

		rectR3 = 123;
		rectG3 = 104;
		rectB3 = 238;

		alpha = 255;
		alpha2 = 255;
		alpha3 = 255;

		shadowCol = color('rgba(75, 75, 255, 0.6)');

		noiseStrength = 0.5;
		d = 0.4;

	} else if (trueEmotion == "surprised") {

		rectR = 255;
		rectG = 215;
		rectB = 0;

		rectR2 = 255;
		rectG2 = 140;
		rectB2 = 0;

		rectR3 = 240;
		rectG3 = 230;
		rectB3 = 140;

		alpha = 255;
		alpha2 = 255;
		alpha3 = 255;

		shadowCol = color('rgba(238, 232, 170, 0.6)');

		noiseStrength = 3;
		d = 1.5;

	} else if (trueEmotion == "fearful") {

		rectR = 75;
		rectG = 0;
		rectB = 130;

		rectR2 = 255;
		rectG2 = 0;
		rectB2 = 255;

		rectR3 = 123;
		rectG3 = 104;
		rectB3 = 238;

		alpha = 255;
		alpha2 = 255;
		alpha3 = 255;

		shadowCol = color('rgba(186, 85, 211, 0.6)');

		noiseStrength = 3;
		d = 1.2;

	} else if (trueEmotion == "angry") {

		rectR = 255;
		rectG = 0;
		rectB = 0;

		rectR2 = 255;
		rectG2 = 127;
		rectB2 = 80;

		rectR3 = 255;
		rectG3 = 69;
		rectB3 = 0;

		alpha = 255;
		alpha2 = 255;
		alpha3 = 255;
		shadowCol = color('rgba(220, 20, 60, 0.6)');
		noiseStrength = -10;
		d = 1.5;


	} else {

		rectR = 150;
		rectG = 255;
		rectB = 255;

		rectR2 = 135;
		rectG2 = 206;
		rectB2 = 250;

		rectR3 = 255;
		rectG3 = 255;
		rectB3 = 255;

		alpha = 0;
		alpha2 = 255;
		alpha3 = 255;

		shadowCol = color('rgba(224, 255, 255, 0.6)');

		noiseStrength = 1;
		d = 0.8;
	};
}

class Particle {
	constructor(_loc, _dir, _speed) {
		this.loc = _loc;
		this.dir = _dir;
		this.speed = _speed;
		// var col;
	}

	//Kernfunktion des Flowfields
	run() {
		this.move();
		this.checkEdges();
		this.update();
	}

	//bewegt Partikel
	move() {	
		let	angle = noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) * TWO_PI * noiseStrength; //0-2PI
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		var vel = this.dir.copy();
		vel.mult(this.speed * d); 
		this.loc.add(vel);
	}
	
	//Prüft ob die Partikel den Canvas verlassen und spawnt sie dann neu an einer zufälligen Postition
	checkEdges() {

		if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {

			this.loc.x = random(width * 1.2);
			this.loc.y = random(height);

		}
	}

	//Teilt die Partikel in drei Gruppen (erste Gruppe mit doppelter Anzahl) und weißt die Farben aus checkEmotions() zu
	update() {

		if (updateCounter == 0) {

			fill(rectR, rectG, rectB, alpha);
			ellipse(this.loc.x, this.loc.y, this.loc.z);
			updateCounter = 1;

		} else if (updateCounter == 1) {

			fill(rectR, rectG, rectB, alpha);
			ellipse(this.loc.x, this.loc.y, this.loc.z);
			updateCounter = 2;

		} else if (updateCounter == 2) {

			fill(rectR2, rectG2, rectB2, alpha2);
			ellipse(this.loc.x, this.loc.y, this.loc.z);
			updateCounter = 3;

		} else {

			fill(rectR3, rectG3, rectB3, alpha3);
			ellipse(this.loc.x, this.loc.y, this.loc.z);
			updateCounter = 0
		}
	}
}



//aktiviert Fullscreenmodus bei Tastendruck f
function keyPressed() {
	if (key == 'f') {
		fullscreen(true);
	}
}

//speichert canvas als jpg
function keyPressed() {
	if (key == 's') {
		save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
	}
}