import { GameObjectClass, Sprite, Text, initKeys, keyPressed, initGamepad, gamepadPressed } from 'kontra';


initKeys();
initGamepad();

export default class StartPage extends GameObjectClass {

  constructor(gameState, properties) {
    super(properties)

    this.gameState = gameState;

    this.title = new Text({
      text: 'You died',
      font: '20px Arial',
      color: 'white',
      x: 60 * 3,
      y: 60 * 3,
    });

    this.scoreText = new Text({
      score: 0,
      text: 'Total score: ' + this.score,
      font: '20px Arial',
      color: 'white',
      x: 60 * 3,
      y: 60 * 3.5,
      update: function () {
        this.text = 'Total score: ' + this.score;
      }
    });

    this.subTitle = new Text({
      text: 'Press [Enter / Start] to try again',
      font: '20px Arial',
      color: 'white',
      x: 60 * 3,
      y: 60 * 4,
    });
  }



  update(dt, score) {
    this.scoreText.score = score;
    this.scoreText.update();
    if (keyPressed('enter') || gamepadPressed('start')) {
      this.gameState.startGame();
    }
  }

  render() {
    this.title.render();
    this.subTitle.render();
    this.scoreText.render();
  }
}