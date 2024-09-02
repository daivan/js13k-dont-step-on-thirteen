import { GameObjectClass, Sprite, Text, initKeys, keyPressed, collides } from 'kontra';


initKeys();

export default class GameState extends GameObjectClass {

  columnNumberArray = [7, 6, 2, 4, 6, 4, 10, 3];
  rowNumberArray = [5, 4, 6, 2, 9, 7, 5];

  score = 0;

  rowNumber = 5;
  columnNumber = 7;

  gameArea = null;

  scoreText = new Text({
    text: this.score,
    font: '20px Arial',
    color: 'white',
    x: 50,
    y: 450,
  });

  rowText = new Text({
    text: this.rowNumber,
    font: '20px Arial',
    color: 'white',
    x: 50,
    y: 500,
  });

  columnText = new Text({
    text: this.columnNumber,
    font: '20px Arial',
    color: 'white',
    x: 50,
    y: 550,
  });

  summaryText = new Text({
    text: 0,
    font: '20px Arial',
    color: 'white',
    x: 50,
    y: 600,
  });

  playerSprite = Sprite({
    x: 300,
    y: 300,
    anchor: {x: 0.5, y: 0.5},
  
    // required for a rectangle sprite
    width: 20,
    height: 20,
    color: 'red',
    update(dt, gameState) {

      if (keyPressed('w')) {
        this.y -= 3;
      }

      if (keyPressed('s')) {
        this.y += 3;
      }

      if (keyPressed('a')) {
        this.x -= 3;
      }

      if (keyPressed('d')) {
        this.x += 3;
      }
    }
  });

  goalSprite = Sprite({
    x: 0,
    y: 64,
    width: 64,
    height: 64,
    color: 'blue',
  });

  updateNumbers() {
    this.rowNumber = Math.floor(this.playerSprite.y / 64);
    this.columnNumber = Math.floor(this.playerSprite.x / 64);
    this.rowText.text = this.rowNumberArray[this.rowNumber];
    this.columnText.text = this.columnNumberArray[this.columnNumber];
    this.summaryText.text = this.rowNumberArray[this.rowNumber] + this.columnNumberArray[this.columnNumber];
  }

  constructor(properties) {
    super(properties)
  }

  update(dt) {
    //console.log(gameState.clockwise);
    this.playerSprite.update();
    this.updateNumbers();
    this.rowText.update();
    this.columnText.update();

    var collide = collides(this.playerSprite, this.goalSprite);
    console.log('collide: ', collide)
    if (collide) {
      this.score = this.score + 1;
      this.goalSprite.x = Math.floor(Math.random() * 10) * 64;
      this.goalSprite.y = Math.floor(Math.random() * 10) * 64;
    }

    this.scoreText.text = this.score;
  }

  render() {
    this.playerSprite.render();
    this.goalSprite.render();
    this.rowText.render();
    this.columnText.render();
    this.summaryText.render();
    this.scoreText.render();
  }
}