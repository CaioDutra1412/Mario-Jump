const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const startButton = document.getElementById('start-button');
const scoreDisplay = document.getElementById('score');

let gameRunning = false;
let isJumping = false;
let score = 0;
let lastPipeScored = false;

const jump = () => {
  if (!isJumping) {
    isJumping = true;
    mario.classList.add('jump');
    setTimeout(() => {
      mario.classList.remove('jump');
      isJumping = false;
    }, 1000); // Mantém Mario no ar por mais tempo
  }
};

startButton.addEventListener('click', () => {
  gameRunning = true;
  startButton.style.display = 'none';
  pipe.style.animationPlayState = 'running';
  document.addEventListener('keydown', handleKeyPress);
});

const handleKeyPress = (event) => {
  if (gameRunning && event.keyCode === 32) {
    jump();
  }
};

document.addEventListener('keyup', (event) => {
  if (event.keyCode === 32) {
    isJumping = false;
  }
});

pipe.style.animationPlayState = 'paused';

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (gameRunning && pipePosition <= 150 && pipePosition > 0 && marioPosition < 120) {
    // Colisão detectada
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.left = `${pipePosition}px`;

    mario.src = 'game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    gameRunning = false;
    clearInterval(loop);
  } else if (gameRunning && pipePosition < 0 && !lastPipeScored) {
    // Mario passou pelo pipe sem colidir
    if (marioPosition > 120) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      lastPipeScored = true;
    }
  } else if (pipePosition >= 150) {
    // Reseta a flag quando o pipe está longe
    lastPipeScored = false;
  }
}, 10);

document.addEventListener('touchstart', jump);
