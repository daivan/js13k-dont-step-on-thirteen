import { init, GameLoop } from 'kontra';

import GameState from './GameState';
import GameArea from './GameArea';

let { canvas, context } = init();

let gameArea = new GameArea()
let gameState = new GameState()

let loop = GameLoop({  // create the main game loop
  update: function (dt) { // update the game state
    gameState.update(dt)
  },
  render: function () { // render the game state
    gameArea.render();
    gameState.render();
  }
});

loop.start();    // start the game