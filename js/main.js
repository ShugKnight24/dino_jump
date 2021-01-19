'use strict';

const dino = document.getElementsByClassName('dino')[0],
	cactus = document.getElementsByClassName('cactus')[0],
	scoreContainer = document.getElementsByClassName('score')[0],
	gameOverText = document.getElementsByClassName('game-over')[0],
	restartButton = document.getElementsByClassName('restart-button')[0];

let jumping = false,
	score = 0,
	gameOver = false;

function cactusMove(){
	cactus.classList.add('cactus-move');
}

cactusMove();

function dinoControl(event){
	// Space Bar & Up arrow
	if (event.keyCode === 32 || event.keyCode === 38){
		dinoJump();
	}
}

function dinoJump(){
	if (!jumping){
		jumping = true;
		dino.classList.add('dino-jump');
	}
	setTimeout(function(){
		dino.classList.remove('dino-jump');
		jumping = false;
	}, 750); // time  here equals the animation time
}

document.addEventListener('keydown', dinoControl);

function checkGameState(){
	let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom')),
		cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));

	if (gameOver) {
		return false;
	} else if (cactusLeft <= 115 && cactusLeft >= -50 && dinoBottom <= 70){
		gameOver = true;
		cactus.classList.remove('cactus-move');
		cactus.classList.add('hidden');
		clearInterval(gameStateTimer);
		gameOverText.classList.remove('hidden');
	} else {
		score++;
		scoreContainer.innerHTML = Math.floor(score / 10);
	}
}

let gameStateTimer = setInterval(checkGameState, 10);

restartButton.addEventListener('click', restartGame);

function restartGame(){
	gameOver = false;
	resetScore();
	gameOverText.classList.add('hidden');
	cactus.classList.remove('hidden');
	cactusMove();
	gameStateTimer = setInterval(checkGameState, 10);
}

function resetScore(){
	scoreContainer.innerHTML = 0;
	score = 0;
}
