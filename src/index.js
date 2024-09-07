import { init, GameLoop, load } from 'kontra';

import GameState from './GameState';
import GameArea from './GameArea';
import StartScene from './StartScene';
import GameOverScene from './GameOverScene';

let { canvas, context } = init();


canvas.width = 64 * 9;
canvas.height = 64 * 9;

const sprites = await load('square.png');

let gameArea = new GameArea(sprites[0]);
let gameState = new GameState(sprites[0], gameArea);
let startScene = new StartScene(gameState);
let gameOverScene = new GameOverScene(gameState);

let loop = GameLoop({  // create the main game loop
  update: function (dt) { // update the game state
    if (gameState.scene == 'START') {
      startScene.update();
      return;
    } else if (gameState.scene == 'GAME_OVER') {
      gameOverScene.update();
      return;
    }
    gameState.gameArea.update(dt)
    gameState.update(dt)
  },
  render: function () { // render the game state
    if (gameState.scene == 'START') {
      startScene.render();
      return;
    } else if (gameState.scene == 'GAME_OVER') {
      gameOverScene.render();
      return;
    }
    gameState.gameArea.render();
    gameState.render();
  }
});

loop.start();    // start the game