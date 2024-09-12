import { GameObjectClass, Sprite, Text, initKeys, keyPressed, collides } from 'kontra';


initKeys();

export default class StartPage extends GameObjectClass {

  constructor(gameState, properties) {
    super(properties)

    this.gameState = gameState;

    this.title = new Text({
      text: 'Dont step on thirteen',
      font: '20px Arial',
      color: 'white',
      x: 64 * 3,
      y: 64 * 3,
    });

    this.subTitle = new Text({
      text: 'Press [Enter] to start',
      font: '20px Arial',
      color: 'white',
      x: 64 * 3,
      y: 64 * 4,
    });
  }



  update(dt) {
    if (keyPressed('enter')) {
      this.gameState.startGame();
    }
  }

  render() {
    this.title.render();
    this.subTitle.render();
  }
}