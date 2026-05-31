const bird = document.getElementById("bird");
const game = document.getElementById("game");

let birdTop = 250;
let gravity = 2;
let velocity = 0;
let gameOver = false;

document.addEventListener("keydown", () => {
    velocity = -15; // jump
});

function createPipe() {
    const pipeTopHeight = Math.floor(Math.random() * 250) + 50;
    const gap = 150;

    const topPipe = document.createElement("div");
    topPipe.classList.add("pipe");
    topPipe.style.height = pipeTopHeight + "px";
    topPipe.style.top = "0px";

    const bottomPipe = document.createElement("div");
    bottomPipe.classList.add("pipe");
    bottomPipe.style.height =
        600 - pipeTopHeight - gap + "px";
    bottomPipe.style.bottom = "0px";

    game.appendChild(topPipe);
    game.appendChild(bottomPipe);

    let pipeX = 400;

    const movePipe = setInterval(() => {
        if (gameOver) {
            clearInterval(movePipe);
            return;
        }

        pipeX -= 3;

        topPipe.style.left = pipeX + "px";
        bottomPipe.style.left = pipeX + "px";

        const birdRect = bird.getBoundingClientRect();
        const topRect = topPipe.getBoundingClientRect();
        const bottomRect = bottomPipe.getBoundingClientRect();

        if (
            birdRect.left < topRect.right &&
            birdRect.right > topRect.left &&
            (
                birdRect.top < topRect.bottom ||
                birdRect.bottom > bottomRect.top
            )
        ) {
            alert("Game Over!");
            gameOver = true;
        }

        if (pipeX < -60) {
            topPipe.remove();
            bottomPipe.remove();
            clearInterval(movePipe);
        }
    }, 20);
}

setInterval(() => {
    if (!gameOver) createPipe();
}, 2000);

function gameLoop() {
    if (gameOver) return;

    velocity += gravity;
    birdTop += velocity;

    if (birdTop < 0) birdTop = 0;

    if (birdTop > 560) {
        alert("Game Over!");
        gameOver = true;
        return;
    }

    bird.style.top = birdTop + "px";

    requestAnimationFrame(gameLoop);
}

gameLoop();