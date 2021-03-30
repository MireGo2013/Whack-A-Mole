const moles = document.querySelectorAll('.mole');
const dirts = document.querySelectorAll('.dirt');
const score = document.getElementById('current_score');
const areaMoles = document.querySelector('.wrapper_dirt')
const startBtn = document.querySelector('.play_btn');

let timeUp = false;
let lastDirt;
let tick = 0;

const DEFAULT_TEXT = {
	START: 'Start!',
	STOP: 'Stop!',
}

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

function randomMole() {
	let indx = Math.floor(Math.random() * dirts.length);
	let dirt = dirts[indx];
	if (dirt === lastDirt) {
		return randomMole();
	} else {
		lastDirt = dirt;
		return dirt;
	}
}

function peeps() {
	let time = randomTime(200, 1000);
	let dirt = randomMole()
	dirt.classList.add('up')
	setTimeout(() => {
		dirt.classList.remove('up');
		if (!timeUp) peeps()
	}, time)
}

function startGame() {
	score.textContent = 0;
	timeUp = false;
	tick = 0
	peeps();
	setTimeout(() => {
		startBtn.textContent = DEFAULT_TEXT.START;
		timeUp = true
	}, 10000)
}

function stopGame() {
	timeUp = true;
}

function setScore(e) {
	if (e.target.classList.contains('mole')) {
		tick++;
		e.target.parentNode.classList.remove('up')
		score.textContent = tick;
	}
}

function startGameBtn() {
	if (startBtn.textContent === DEFAULT_TEXT.START) {
		startBtn.textContent = DEFAULT_TEXT.STOP;
		startGame()
	} else {
		startBtn.textContent = DEFAULT_TEXT.START;
		stopGame()
	}
}


areaMoles.addEventListener('click', setScore)
startBtn.addEventListener('click', startGameBtn)



