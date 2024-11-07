import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Game = () => {
  const [gameState, setGameState] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  const startGame = async () => {
    try {
      const response = await axios.get('https://snake-bite-2.onrender.com/api/start');
      setGameState(response.data);
      setIsStarted(true);
    } catch (error) {
      console.error("Error starting the game:", error);
    }
  };

  useEffect(() => {
    if (isStarted) {
      const intervalId = setInterval(async () => {
        try {
          const response = await axios.get('https://snake-bite-2.onrender.com/api/state');
          setGameState(response.data);
        } catch (error) {
          console.error("Error updating game state:", error);
        }
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [isStarted]);

  const handleDirectionChange = async (direction) => {
    try {
      await axios.post('https://snake-bite-2.onrender.com/api/change-direction', { direction });
    } catch (error) {
      console.error("Error changing direction:", error);
    }
  };

  if (!gameState) {
    return (
      <div className="game-container">
        <h1 className="title">Snake Game</h1>
        <button className="start-button" onClick={startGame}>Start Game</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1 className="title">Snake Game</h1>

      {!isStarted ? (
        <button className="start-button" onClick={startGame}>Start Game</button>
      ) : (
        <>
          <div className="game-board">
            {gameState.snake.map((segment, index) => (
              <div
                key={index}
                className="snake-segment"
                style={{
                  top: `${segment.y * 20}px`,
                  left: `${segment.x * 20}px`,
                }}
              />
            ))}
            <div
              className="food"
              style={{
                top: `${gameState.food.y * 20}px`,
                left: `${gameState.food.x * 20}px`,
              }}
            />
            {gameState.gameOver && (
              <div className="overlay">
                <div className="game-over">
                  <h2>Game Over</h2>
                  <button onClick={startGame}>Restart</button>
                </div>
              </div>
            )}
          </div>

          <div className="score">Score: {gameState.score}</div>

          <div className="controls">
            <button onClick={() => handleDirectionChange('UP')}>↑</button>
            <div>
              <button onClick={() => handleDirectionChange('LEFT')}>←</button>
              <button onClick={() => handleDirectionChange('RIGHT')}>→</button>
            </div>
            <button onClick={() => handleDirectionChange('DOWN')}>↓</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Game = () => {
  const [gameState, setGameState] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  const startGame = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/start');
      setGameState(response.data);
      setIsStarted(true);
    } catch (error) {
      console.error("Error starting the game:", error);
    }
  };

  useEffect(() => {
    if (isStarted) {
      const intervalId = setInterval(async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/state');
          setGameState(response.data);
        } catch (error) {
          console.error("Error updating game state:", error);
        }
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [isStarted]);

  const handleDirectionChange = async (direction) => {
    try {
      await axios.post('http://localhost:5000/api/change-direction', { direction });
    } catch (error) {
      console.error("Error changing direction:", error);
    }
  };

  if (!gameState) {
    return (
      <div className="game-container">
        <h1 className="title">Snake Game</h1>
        <button className="start-button" onClick={startGame}>Start Game</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1 className="title">Snake Game</h1>

      {!isStarted ? (
        <button className="start-button" onClick={startGame}>Start Game</button>
      ) : (
        <>
          <div className="game-board">
            {gameState.snake.map((segment, index) => (
              <div
                key={index}
                className={index === 0 ? "snake-segment snake-head" : "snake-segment"}
                style={{
                  top: `${segment.y * 20}px`,
                  left: `${segment.x * 20}px`,
                }}
              />
            ))}
            <div
              className="food"
              style={{
                top: `${gameState.food.y * 20}px`,
                left: `${gameState.food.x * 20}px`,
              }}
            />
            {gameState.gameOver && (
              <div className="overlay">
                <div className="game-over">
                  <h2>Game Over</h2>
                  <button onClick={startGame}>Restart</button>
                </div>
              </div>
            )}
          </div>

          <div className="score">Score: {gameState.score}</div>

          <div className="controls">
            <button onClick={() => handleDirectionChange('UP')}>↑</button>
            <div>
              <button onClick={() => handleDirectionChange('LEFT')}>←</button>
              <button onClick={() => handleDirectionChange('RIGHT')}>→</button>
            </div>
            <button onClick={() => handleDirectionChange('DOWN')}>↓</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;*/



