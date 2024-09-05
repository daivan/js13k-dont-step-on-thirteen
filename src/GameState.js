import { GameObjectClass, Sprite, Text, initKeys, keyPressed, collides } from 'kontra';


initKeys();

export default class GameState extends GameObjectClass {

  constructor(sprite, gameArea, properties) {
    super(properties)
    this.sprite = sprite;
    this.gameArea = gameArea;

    this.goalSprite = Sprite({
      x: Math.floor(Math.random() * 7) * 64 + 64,
      y: Math.floor(Math.random() * 7) * 64 + 64,
      width: 64,
      height: 64,
      color: '#9fd7ddcc',
    });

    this.playerSprite = Sprite({
      x: 300,
      y: 300,
      velocity: { x: 0, y: 0 },
      direction: { x: 0, y: 0 },
      anchor: { x: 0.5, y: 0.5 },
      speed: 2,
      size: 36,
      customImage: this.sprite,
      render() {
        const gradient = this.context.createRadialGradient(0, 0, 0, 0, 0, this.size * 1.2);
        gradient.addColorStop(0, '#9fd7ddff');
        gradient.addColorStop(1, '#9fd7dd00');
        this.context.fillStyle = gradient;
        this.context.beginPath();
        this.context.arc(0, 0, this.size * 1.2, 0, 2 * Math.PI);
        this.context.fill();

        this.context.drawImage(this.customImage, 36, 4, 24, 24, -this.size / 2, -this.size / 2, this.size, this.size);
        this.context.drawImage(this.customImage, 4, 4, 24, 24, (-this.size / 2 + this.direction.x * 2), (-this.size / 2 + this.direction.y * 2), this.size, this.size);
      },
      update(dt, gameState) {
        this.direction.x = 0;
        this.direction.y = 0;

        if (keyPressed('w')) {
          this.direction.y = -1;
        }

        if (keyPressed('s')) {
          this.direction.y = 1;
        }

        if (keyPressed('a')) {
          this.direction.x = -1;
        }

        if (keyPressed('d')) {
          this.direction.x = 1;
        }

        this.velocity.x = this.direction.x * this.speed;
        this.velocity.y = this.direction.y * this.speed;

        if (this.velocity.x !== 0 && this.velocity.y !== 0) {
          this.velocity.x /= Math.sqrt(2);
          this.velocity.y /= Math.sqrt(2);
        }


        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if (this.x < 64 + this.size / 2) {
          this.x = 64 + this.size / 2;
        }
        if (this.x > 64 * 8 - this.size / 2) {
          this.x = 64 * 8 - this.size / 2;
        }
        if (this.y < 64 + this.size / 2) {
          this.y = 64 + this.size / 2;
        }
        if (this.y > 64 * 8 - this.size / 2) {
          this.y = 64 * 8 - this.size / 2;
        }
      }
    });
  }

  score = 0;

  scoreText = new Text({
    text: this.score,
    font: '20px Arial',
    color: 'white',
    x: 32 - 5 + 64 * 2,
    y: 64 * 8 + 37,
  });

  rowText = new Text({
    text: this.rowNumber,
    font: '20px Arial',
    color: 'white',
    x: 32 - 5 + 64 * 3,
    y: 64 * 8 + 37,
  });

  columnText = new Text({
    text: this.columnNumber,
    font: '20px Arial',
    color: 'white',
    x: 32 - 5 + 64 * 4,
    y: 64 * 8 + 37,
  });

  summaryText = new Text({
    text: 0,
    font: '20px Arial',
    color: 'white',
    x: 32 - 5 + 64 * 5,
    y: 64 * 8 + 37,
  });

  updateNumbers() {
    this.rowNumber = Math.floor(this.playerSprite.y / 64) - 1;
    this.columnNumber = Math.floor(this.playerSprite.x / 64) - 1;
    this.rowText.text = this.gameArea.verticalNumbers[this.rowNumber];
    this.columnText.text = this.gameArea.horizontalNumbers[this.columnNumber];
    this.summaryText.text = this.gameArea.verticalNumbers[this.rowNumber] + this.gameArea.horizontalNumbers[this.columnNumber];
  }



  update(dt) {
    this.playerSprite.update();
    this.updateNumbers();
    this.rowText.update();
    this.columnText.update();

    var collide = collides(this.playerSprite, this.goalSprite);
    if (collide) {
      this.score = this.score + 1;
      this.goalSprite.x = Math.floor(Math.random() * 7) * 64 + 64;
      this.goalSprite.y = Math.floor(Math.random() * 7) * 64 + 64;
    }

    this.scoreText.text = this.score;
  }

  render() {
    this.goalSprite.render();
    this.playerSprite.render();
    this.rowText.render();
    this.columnText.render();
    this.summaryText.render();
    this.scoreText.render();
  }
}