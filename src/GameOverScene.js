import { GameObjectClass, Sprite, Text, initKeys, keyPressed, collides } from 'kontra';


initKeys();

  export default class StartPage extends GameObjectClass {

  constructor(gameState, properties) {
    super(properties)
    
    this.gameState = gameState;

    this.title = new Text({
      text: 'You died',
      font: '20px Arial',
      color: 'white',
      x: 20,
      y: 40,
    });

    this.subTitle = new Text({
      text: 'Press [Enter] to try again',
      font: '20px Arial',
      color: 'white',
      x: 20,
      y: 100,
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