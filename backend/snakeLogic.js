let snake, food, direction, score, gameOver, speed, updateCounter;

function startGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 };
  food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
  score = 0;
  gameOver = false;
  speed = 10;
  updateCounter = 0;
}

function getState() {
  return { snake, food, score, gameOver };
}

function changeDirection(newDirection) {
  if (newDirection === 'UP' && direction.y === 0) direction = { x: 0, y: -1 };
  else if (newDirection === 'DOWN' && direction.y === 0) direction = { x: 0, y: 1 };
  else if (newDirection === 'LEFT' && direction.x === 0) direction = { x: -1, y: 0 };
  else if (newDirection === 'RIGHT' && direction.x === 0) direction = { x: 1, y: 0 };
}

function updateState() {
  if (gameOver) return;

  updateCounter++;
  if (updateCounter % speed !== 0) return;

  const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check for wall collisions
  if (newHead.x < 0 || newHead.y < 0 || newHead.x >= 20 || newHead.y >= 20) {
    gameOver = true;
    return;
  }

  // Check for self-collision
  for (const segment of snake) {
    if (newHead.x === segment.x && newHead.y === segment.y) {
      gameOver = true;
      return;
    }
  }

  // Check if snake has eaten the food
  if (newHead.x === food.x && newHead.y === food.y) {
    score += 10;
    speed = Math.max(5, speed - 1);
    food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
}

module.exports = { startGame, getState, changeDirection, updateState };


