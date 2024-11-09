const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('timeLeft');
const startButton = document.getElementById('startButton');

let score = 0;
let timeLeft = 30;
let gameInterval;
let moleTimeout;

// Array of character image paths
const characterImages = [
    'images/character1.png',
    'images/character2.png',
    'images/character3.png'
];

// Create grid holes
function createGrid() {
    for (let i = 0; i < 9; i++) {
        const hole = document.createElement('div');
        hole.classList.add('hole');

        const mole = document.createElement('div');
        mole.classList.add('mole');

        mole.addEventListener('click', () => {
            if (mole.classList.contains('show')) {
                score++;
                scoreDisplay.innerText = score;
                mole.classList.remove('show');
            }
        });

        hole.appendChild(mole);
        gameArea.appendChild(hole);
    }
}

// Randomly show a mole with a random character image
function showRandomMole() {
    const moles = document.querySelectorAll('.mole');
    const randomMole = moles[Math.floor(Math.random() * moles.length)];
    const randomImage = characterImages[Math.floor(Math.random() * characterImages.length)];
    randomMole.style.backgroundImage = `url(${randomImage})`;
    randomMole.classList.add('show');

    // Hide mole after a short time
    moleTimeout = setTimeout(() => {
        randomMole.classList.remove('show');
    }, 1000);
}

// Game timer
function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
        timeLeftDisplay.innerText = timeLeft;
    } else {
        endGame();
    }
}

// Start the game
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.innerText = score;
    timeLeftDisplay.innerText = timeLeft;

    startButton.disabled = true;
    gameInterval = setInterval(showRandomMole, 800); // Show a mole every 800ms
    countdownInterval = setInterval(countdown, 1000); // Update time every second
}

// End the game
function endGame() {
    clearInterval(gameInterval);
    clearInterval(countdownInterval);
    clearTimeout(moleTimeout);
    alert(`Game Over! Your score is ${score}`);
    startButton.disabled = false;
}

// Initialize the game board
createGrid();
startButton.addEventListener('click', startGame);
