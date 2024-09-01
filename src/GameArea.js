import { GameObjectClass, Sprite, Text } from 'kontra';

export default class GameArea {

  numbersInRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  numberOfRows = 10;
  numberOfColumns = 8;


  scoreText = new Text({
    text: '7',
    font: '20px Arial',
    color: 'black',
    x: 0,
    y: 0,

  });

  scoreText2 = new Text({
    text: '6',
    font: '20px Arial',
    color: 'black',
    x: 64,
    y: 0,

  });

  scoreText3 = new Text({
    text: '2',
    font: '20px Arial',
    color: 'black',
    x: 128,
    y: 0,

  });
  scoreText4 = new Text({
    text: '4',
    font: '20px Arial',
    color: 'black',
    x: 196,
    y: 0,

  });
  scoreText5 = new Text({
    text: '6',
    font: '20px Arial',
    color: 'black',
    x: 256,
    y: 0,

  });
  scoreText6 = new Text({
    text: '4',
    font: '20px Arial',
    color: 'black',
    x: 320,
    y: 0,
  });
  scoreText7 = new Text({
    text: '10',
    font: '20px Arial',
    color: 'black',
    x: 384,
    y: 0,

  });

  scoreText8 = new Text({
    text: '3',
    font: '20px Arial',
    color: 'black',
    x: 448,
    y: 0,

  });

  rightText1 = new Text({
    text: '5',
    font: '20px Arial',
    color: 'black',
    x: 490,
    y: 40,
  });

  rightText2 = new Text({
    text: '4',
    font: '20px Arial',
    color: 'black',
    x: 490,
    y: 104,
  });

  rightText3 = new Text({
    text: '6',
    font: '20px Arial',
    color: 'black',
    x: 490,
    y: 168,
  });

  rightText4 = new Text({
    text: '2',
    font: '20px Arial',
    color: 'black',
    x: 490,
    y: 232,
  });

  rightText5 = new Text({
    text: '9',
    font: '20px Arial',
    color: 'black',
    x: 490,
    y: 296,
  });

  rightText6 = new Text({
    text: '7',
    font: '20px Arial',
    color: 'black',
    x: 490,
    y: 360,
  });

  rightText7 = new Text({
    text: '5',
    font: '20px Arial',
    color: 'black',
    x: 490,
    y: 424,
  });

  background = Sprite({
    x: 0,
    y: 0,
    // required for an image sprite
    render: function() {
      const tileSize = 64; // Size of each tile
      //const numRows = canvas.height / tileSize;
      //const numCols = canvas.width / tileSize;
  
      const numRows = 7;
      const numCols = 8;

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



 

  update(dt) {

  }

  render() {
    this.background.render();

    this.scoreText.render();
    this.scoreText2.render();
    this.scoreText3.render();
    this.scoreText4.render();
    this.scoreText5.render();
    this.scoreText6.render();
    this.scoreText7.render();
    this.scoreText8.render();

    this.rightText1.render();
    this.rightText2.render();
    this.rightText3.render();
    this.rightText4.render();
    this.rightText5.render();
    this.rightText6.render();
    this.rightText7.render();
  }
}