import { GameObjectClass, Sprite, Text } from 'kontra';


export default class GameUI extends GameObjectClass {



  background = Sprite({
    x: 0,
    y: 0,
    // required for an image sprite
    render: function() {
      const tileSize = 64; // Size of each tile
      const numRows = canvas.height / tileSize;
      const numCols = canvas.width / tileSize;
  
      // Define different tile colors
      const colors = ['#EAEAEA', '#D3D3D3'];
  
      // Loop through rows and columns to draw tiles
      for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numCols; col++) {
              // Calculate the x and y position of the tile
              const x = col * tileSize;
              const y = row * tileSize;
  
              // Determine the color of the tile based on row and column
              const colorIndex = (row + col) % colors.length;
              const tileColor = colors[colorIndex];
  
              // Draw the tile
              this.context.fillStyle = tileColor;
              this.context.fillRect(x, y, tileSize, tileSize);
          }
      }
    }
  });

  header = new Text({
    text: 'The Alchemistis',
    font: '72px Arial',
    x: 280,
    y: 185,
  });

  subText = new Text({
    text: 'Press Space to play',
    font: '32px Arial',
    x: 320,
    y: 300,
  });

  timeLeftText = new Text({
    time: 0,
    text: 'Time left:',
    font: '20px Arial',
    color: 'black',
    x: 10,
    y: 650,
    update: function (dt) {
      this.text = 'Time left: ' + this.time;
    }
  });

  ingredientsText = new Text({
    text: '',
    font: '20px Arial',
    color: 'black',
    x: 280,
    y: 185,
  });

  scoreText = new Text({
    score: 0,
    text: 'Score: ',
    font: '20px Arial',
    color: 'black',
    x: 10,
    y: 675,
    update: function (dt) {
      this.text = 'Score: ' + this.score;
    }
  });


  temperatureText = new Text({
    text: 'Heat\nStirr',
    font: '20px Arial',
    color: 'black',
    x: 10,
    y: 700,
  });

  heatTemperatureGoal = Sprite({
    x: 120,
    y: 729,
    color: 'purple',
    width: 30, 
    height: 6,
  });

  heatTemperature = Sprite({
    temperatureValue: 100,
    x: 50,
    y: 730,
    color: 'green',
    width: 100, 
    height: 4,
    update: function (dt) {
      this.width = this.temperatureValue;
      if (this.temperatureValue < 70 || this.temperatureValue > 100) {
        this.color = 'red';
      } else {
        this.color = 'green';
      }
    }
  });

  stirTemperatureGoal = Sprite({
    x: 120,
    y: 739,
    color: 'purple',
    width: 30, 
    height: 6,
  });

  stirTemperature = Sprite({
    temperatureValue: 100,
    x: 50,
    y: 740,                
    color: 'green',
    width: 100, 
    height: 4,
    update: function (dt) {
      this.width = this.temperatureValue;
      if (this.temperatureValue < 70 || this.temperatureValue > 100) {
        this.color = 'red';
      } else {
        this.color = 'green';
      }
    }
  });

  constructor(properties) {
    super(properties)
  }

  update(dt, gameState) {
    this.ingredientsText.text = gameState.ingredients.map((ingredient, index) => {
      return `${index + 1}: ${ingredient}`
    }).join('\n');

    this.scoreText.score = gameState.score
    this.scoreText.update(dt)
    this.heatTemperature.temperatureValue = gameState.heatTemperature
    this.heatTemperature.update(dt)
    this.stirTemperature.temperatureValue = gameState.stirTemperature
    this.stirTemperature.update(dt)
    this.timeLeftText.time = gameState.timeLeft
    this.timeLeftText.update(dt)
  }

  render(gameState) {
 
    this.background.render();

    if (gameState.state !== 'start_screen') {

      this.header.text = 'The Alchemist'
      this.subText.text = 'Press space to start'
    }

    if (gameState.state === 'game_over') {
      this.header.text = 'Game over'
      this.subText.text = 'Press space to play again'
    }

    if (gameState.state !== 'playing') {
      this.header.render()
      this.subText.render()
    } else {
      this.temperatureText.render()
      this.heatTemperatureGoal.render()
      this.heatTemperature.render()
      this.stirTemperatureGoal.render()
      this.stirTemperature.render()
      this.scoreText.render()
      this.ingredientsText.render()
      this.timeLeftText.render()
    }
  }
}