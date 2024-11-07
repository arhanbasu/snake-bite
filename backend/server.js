const express = require('express');
const cors = require('cors');
const game = require('./snakeLogic');
const app = express();

app.use(cors());
app.use(express.json());

// Start game and initialize the game state
app.get('/api/start', (req, res) => {
  game.startGame();
  res.json(game.getState());
});

// Get the current state of the game
app.get('/api/state', (req, res) => {
  game.updateState();
  res.json(game.getState());
});

// Change the snake's direction
app.post('/api/change-direction', (req, res) => {
  const { direction } = req.body;
  game.changeDirection(direction);
  res.sendStatus(200);
});

// Start server
app.listen(https://snake-bite-2.onrender.com, () => {
  console.log('Backend server running on http://localhost:5000');
});


