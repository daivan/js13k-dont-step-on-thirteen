import { init, GameLoop } from 'kontra';

import PlayerActor from './Player';
import GameArea from './GameArea';

let { canvas, context } = init();


let gameArea = new GameArea()
let playerActor = new PlayerActor()




let loop = GameLoop({  // create the main game loop
  update: function (dt) { // update the game state
    playerActor.update(dt)
  },
  render: function () { // render the game state
    gameArea.render();
    playerActor.render();
  }
});

loop.start();    // start the game