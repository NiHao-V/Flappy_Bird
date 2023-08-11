const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
let frame = 0;
const DEGREE = Math.PI / 180;

const sprite = new Image();
sprite.src = "img/sprite.png";

const SCORE = new Audio();
SCORE.src = "audio/sfx_point.wav";

const FLAP = new Audio();
FLAP.src = "audio/sfx_flap.wav";

const DIE = new Audio();
DIE.src = "audio/sfx_die.wav";

const HIT = new Audio();
HIT.src = "audio/sfx_hit.wav";

const SWOOSHING = new Audio();
SWOOSHING.src = "audio/sfx_swooshing.wav";

const startBtn = {
    x: cvs.width / 2 - 41.5,
    y: 263,
    w: 83,
    h: 29,
};

const gameState = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2,
};

// Инициализация объектов
const bg = new Background(0, 0, 288, 512, 0, cvs.height - 226, cvs.width, 226, 2);
bg.increaseSize();
const fg = new Background(276, 0, 224, 112, 0, cvs.height - 112, cvs.width, 112, 2);
const bird = new Bird();
const pipes = new Pipe();
const score = new Score();
const getReady = new Message(0, 228, 173, 152, cvs.width / 2 - 173 / 2, 200);
const gameOver = new Message(175, 228, 225, 202, cvs.width / 2 - 225 / 2, 240);

// Обработчик события mousedown
cvs.addEventListener("mousedown", handleMouseDown);

function update() {
    bird.update();
    fg.update();
    pipes.update();
}

function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    bg.draw();
    pipes.draw();
    fg.draw();
    bird.draw();

    if (gameState.current === gameState.over) {
        ctx.drawImage(sprite, 0, 114, startBtn.w, startBtn.h, startBtn.x, startBtn.y, startBtn.w, startBtn.h);
    }

    if (gameState.current === gameState.over) {
        gameOver.draw();
    }

    if (gameState.current === gameState.getReady) {
        getReady.draw();
    }

    score.draw();
}

function loop() {
    update();
    bg.update();
    draw();
    frame++;
    requestAnimationFrame(loop);
}

function resetGame() {
    bird.reset();
    pipes.reset();
    score.reset();
    gameState.current = gameState.getReady;
}

loop();