/* 
 * Space Bubbles 🚀
 * 
 * written by Zul Hilmi, 25 September 2019
 * repository: https://github.com/hilmizul/space_math
 * play online: https://spacemath.zulhilmi.id
 */
let rocket;
let bullets = [];
let bidangs = [];
let totalBidang = 7;
let fire = false;
let skor = 0;
let mis = 0;
let sfxPop, sfxFire, sfxEdge;
let hit = false;
let timer = 59;
let gameOver = false;
let theme_song;
let rekam;

rekam = new p5.SpeechRec();
rekam.continuous = true;

function preload() {
	sfxPop = loadSound("assets/sfx/pop.mp3");
	sfxEdge = loadSound("assets/sfx/edge.mp3");
	sfxFire = loadSound("assets/sfx/fire.wav");
	theme_song = loadSound("assets/music/theme-song.mp3");
}

function setup() {
	createCanvas(windowWidth / 2, windowHeight);
	rocket = new Rocket();
	for (let i = 0; i < totalBidang; i++) {
		bidangs.push(new Bidang());
	}
	theme_song.loop();

	rekam.onResult = showResult;
	rekam.start();
}

function showResult() {
	console.log(rekam.resultString);
	console.log(rekam.resultConfidence);
	if (rekam.resultString == 'right') {
		rocket.right = true;
		rekam.resultString = '';
	} else if (rekam.resultString == 'left') {
		rocket.left = true;
		rekam.resultString = '';
	} else if (rekam.resultString == 'fire') {
		if (!gameOver) {
			fire = true;
			sfxFire.play();
			bullets.push(new Bullet(rocket.pos.x + rocket.alas / 2, rocket.pos.y - rocket.tinggi));
		}
	} 	

}

function draw() {
	if (!gameOver) {
		background(0);
		// ROCKET Segitiga 😅
		rocket.knalpot();
		rocket.show();
		rocket.move();
		rocket.cekTepi();

		// BIDANG
		for (let i = 0; i < bidangs.length; i++) {
			bidangs[i].show();
			bidangs[i].move();
			bidangs[i].jiggling();
			if (bidangs[i].cekTepi()) {
				mis++;
				bidangs.splice(i, 1);
				bidangs.push(new Bidang());
			}
		}

		// BULLETS
		if (fire) {
			for (let j = 0; j < bullets.length; j++) {
				bullets[j].show();
				bullets[j].move();
				if (bullets[j].hit(bidangs)) {
					sfxPop.play();
					bullets.splice(j, 1);
					bidangs.push(new Bidang());
					hit = true;
					skor++; // jika bullet mengenai bidang/musuh, maka skor bertambah 1
				} else {
					if (bullets[j].pantulkan()) {
						bullets.splice(j, 1);
					}
				}
			}
		}

		// TAMPILKAN SKOR, MIS, BULLETS
		push();
		fill(255);
		noStroke();
		textSize(20);
		text("Skor: " + skor, 10, 30);
		text("Mis: " + mis, 10, 60);
		pop();

		// TIMER
		if (frameCount % 60 == 0 && timer > 0) {
			timer--;
		}

		if (timer == 0) {
			push();
			fill(255);
			textSize(70);
			textAlign(CENTER, CENTER);
			text("GAME OVER", width / 2, height / 2);
			gameOver = true;
			theme_song.stop();
			pop();
		}

		push();
		fill(255);
		noStroke();
		textSize(20);
		textAlign(CENTER, CENTER);
		text("Timer: " + timer, width - 50, 30);
		pop();
	}
}

function restart() {
	gameOver = false;
	timer = 59;
	skor = 0;
	mis = 0;
	loop();
	theme_song.loop();
}

function keyPressed() {
	if (keyCode == RIGHT_ARROW) {
		rocket.right = true;
	} else if (keyCode == DOWN_ARROW) {
		rocket.down = true;
	} else if (keyCode == LEFT_ARROW) {
		rocket.left = true;
	} else if (keyCode == UP_ARROW) {
		rocket.up = true;
	} else if (key == ' ') {
		if (!gameOver) {
			fire = true;
			sfxFire.play();
			bullets.push(new Bullet(rocket.pos.x + rocket.alas / 2, rocket.pos.y - rocket.tinggi));
		}
	} else if (keyCode == RETURN) {
		restart();
	}
}

function keyReleased() {
	// jika tombol arah dilepas, maka stop update posisi
	rocket.right = false;
	rocket.down = false;
	rocket.left = false;
	rocket.up = false;
}