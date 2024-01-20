'use strict';

// classes
const dino = document.querySelector('.dino'),
	cactus = document.querySelector('.cactus'),
	currentScoreContainer = document.querySelector('.current-score-container'),
	scoreContainer = document.querySelector('.score'),
	highScoreContainer = document.querySelector('.high-score'),
	gameOverText = document.querySelector('.game-over'),
	restartButton = document.querySelector('.restart-button');

// ids
const hitAudio = document.querySelector('#hit-audio'),
	jumpAudio = document.querySelector('#jump-audio'),
	milestoneAudio = document.querySelector('#milestone-audio');

// constants
const LOCAL_STORAGE_SCORE_KEY = 'dino.score';
	
let jumping = false,
	score = 0,
	highScore = localStorage.getItem(LOCAL_STORAGE_SCORE_KEY) || 0,
	gameOver = true,
	gameStarted = false;

document.addEventListener('DOMContentLoaded', function(){
	loadHighScore();
});

function loadHighScore(){
	highScoreContainer.innerHTML = highScore;
}

function cactusMove(){
	cactus.classList.add('cactus-move');
}

function dinoControl(event){
	// Space Bar & Up arrow
	if (event.keyCode === 32 || event.keyCode === 38){
		dinoJump();
	}
}

function dinoJump(){
	if (gameOver){
		startGame();
	}
	if (!gameStarted){
		startGame();
	}
	if (!jumping){
		jumping = true;
		dino.classList.add('dino-jump');
		jumpAudio.play();
	}
	setTimeout(function(){
		dino.classList.remove('dino-jump');
		jumping = false;
	}, 750); // time  here equals the animation time
}

document.addEventListener('keydown', dinoControl);

function checkGameState(){
	let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom')),
		cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left')),
		adjustedScore = Math.floor(score / 10);

	if (gameOver) {
		return false;
	} else if (cactusLeft <= 115 && cactusLeft >= -50 && dinoBottom <= 70){
		gameOver = true;
		dino.classList.add('dead');
		hitAudio.play();
		cactus.classList.remove('cactus-move');
		cactus.classList.add('hidden');
		clearInterval(gameStateTimer);
		gameOverText.classList.remove('hidden');

		if (highScore < adjustedScore){
			highScore = adjustedScore;
			saveHighScore();
			loadHighScore();
		}
	} else {
		score++;
		scoreContainer.innerHTML = adjustedScore;

		if (adjustedScore !== 0 && adjustedScore % 100 === 0){
			milestoneAudio.play();
			currentScoreContainer.classList.add('exclamation', 'grow');
			setTimeout(function(){
				currentScoreContainer.classList.remove('exclamation', 'grow');
			}, 750);
		}
	}
}

let gameStateTimer = setInterval(checkGameState, 10);

restartButton.addEventListener('click', startGame);

function startGame(){
	gameOver = false;
	gameStarted = true;
	resetScore();
	dino.classList.remove('dead');
	gameOverText.classList.add('hidden');
	cactus.classList.remove('hidden');
	cactusMove();
	gameStateTimer = setInterval(checkGameState, 10);
}

function resetScore(){
	scoreContainer.innerHTML = 0;
	score = 0;
}

function saveHighScore(){
	localStorage.setItem(LOCAL_STORAGE_SCORE_KEY, highScore);
}

// Handle Settings Menu
const openSettingsButton = document.querySelector('.open-settings'),
	closeSettingsButton = document.querySelector('.close-settings'),
	settings = document.querySelector('.settings-container');

openSettingsButton.addEventListener('click', openSettings);
closeSettingsButton.addEventListener('click', closeSettings);

function openSettings() {
	settings.classList.add('open');
}

function closeSettings() {
	settings.classList.remove('open');
}

