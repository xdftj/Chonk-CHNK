const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;

// Chonk character
const chonk = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    dx: 0
};

// Falling coins
const coins = [];
const coinSize = 20;

function createCoin() {
    const x = Math.random() * (canvas.width - coinSize);
    coins.push({ x, y: 0, size: coinSize });
}

function drawChonk() {
    ctx.fillStyle = "purple";
    ctx.fillRect(chonk.x, chonk.y, chonk.width, chonk.height);
}

function drawCoins() {
    ctx.fillStyle = "gold";
    coins.forEach(coin => {
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateCoins() {
    coins.forEach((coin, index) => {
        coin.y += 2;
        if (coin.y > canvas.height) coins.splice(index, 1); // Remove off-screen coins

        // Check collision with chonk
        if (
            coin.x < chonk.x + chonk.width &&
            coin.x + coin.size > chonk.x &&
            coin.y < chonk.y + chonk.height &&
            coin.y + coin.size > chonk.y
        ) {
            coins.splice(index, 1);
            score += 10;
            document.getElementById("score").textContent = `Score: ${score}`;
            if (score >= 100) {
                alert("Congratulations! You've earned CHNK tokens!");
                score = 0;
            }
        }
    });
}

function updateChonk() {
    chonk.x += chonk.dx;

    // Prevent going out of bounds
    if (chonk.x < 0) chonk.x = 0;
    if (chonk.x + chonk.width > canvas.width) chonk.x = canvas.width - chonk.width;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawChonk();
    drawCoins();
    updateCoins();
    updateChonk();

    requestAnimationFrame(gameLoop);
}

// Key controls
document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") chonk.dx = -5;
    if (e.key === "ArrowRight") chonk.dx = 5;
});

document.addEventListener("keyup", () => {
    chonk.dx = 0;
});

// Start game
setInterval(createCoin, 1000);
gameLoop();
