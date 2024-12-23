// Setup the canvas and game variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;  // Size of the grid
const canvasSize = 400;  // Size of the canvas
let snake = [{ x: 160, y: 160 }];  // Initial snake
let food = generateFood();
let score = 0;
let direction = "RIGHT";
let changingDirection = false;

// Function to draw the snake and food
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#00FF00" : "#008000"; // Head is green, body is dark green
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Update the score display
    document.getElementById("score").innerText = score;
}

// Function to move the snake
function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case "UP":
            head.y -= gridSize;
            break;
        case "DOWN":
            head.y += gridSize;
            break;
        case "LEFT":
            head.x -= gridSize;
            break;
        case "RIGHT":
            head.x += gridSize;
            break;
    }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();
    }
}

// Function to change the direction of the snake
function changeDirection(event) {
    if (changingDirection) return;

    changingDirection = true;

    const keyPressed = event.keyCode;
    if (keyPressed === 37 && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (keyPressed === 38 && direction !== "DOWN") {
        direction = "UP";
    } else if (keyPressed === 39 && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (keyPressed === 40 && direction !== "UP") {
        direction = "DOWN";
    }
}

// Function to generate new food coordinates
function generateFood() {
    let foodX, foodY;
    while (true) {
        foodX = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
        foodY = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;

        if (!snake.some(segment => segment.x === foodX && segment.y === foodY)) {
            break;
        }
    }
    return { x: foodX, y: foodY };
}

// Function to check if the game is over
function checkGameOver() {
    const head = snake[0];

    // Check if snake hits the wall
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    // Check if snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Main game loop
function gameLoop() {
    if (checkGameOver()) {
        alert("Game Over! Your final score is " + score);
        document.location.reload(); // Reload the page to restart the game
    }

    changingDirection = false;
    moveSnake();
    draw();
}

// Start the game
document.addEventListener("keydown", changeDirection);
setInterval(gameLoop, 100); // Run the game loop every 100ms
