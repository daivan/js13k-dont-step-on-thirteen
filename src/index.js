import { init, GameLoop, load } from 'kontra';

import GameState from './GameState';
import GameArea from './GameArea';

let { canvas, context } = init();


canvas.width = 64 * 9;
canvas.height = 64 * 9;

const sprites = await load('square.png');

let gameArea = new GameArea(sprites[0]);
let gameState = new GameState(sprites[0], gameArea);

let loop = GameLoop({  // create the main game loop
  update: function (dt) { // update the game state
    gameState.gameArea.update(dt)
    gameState.update(dt)
  },
  render: function () { // render the game state
    gameState.gameArea.render();
    gameState.render();
  }
});

loop.start();    // start the game