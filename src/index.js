import { initInput, onInput, initPointer, track, init, Sprite, GameLoop, getPointer, keyPressed } from 'kontra';
import { zzfx } from 'zzfx';

import GameState from './GameState';

let { canvas, context } = init();

let gameState = new GameState(0);

gameState.reset();

initPointer();
initInput();

let loop = GameLoop({  // create the main game loop
  update: function (dt) { // update the game state
    gameState.update(dt);
  },
  render: function () { // render the game state
    gameState.render();
  }
});

loop.start();    // start the game