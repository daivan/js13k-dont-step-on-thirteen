import { GameObjectClass, Sprite, Text } from 'kontra';

export default class GameArea {

  numbersInRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  numberOfRows = 10;
  numberOfColumns = 8;


  columnText = new Text({
    text: '7',
    font: '20px Arial',
    color: 'black',
    x: 0,
    y: 0,

  });

  columnText2 = new Text({
    text: '6',
    font: '20px Arial',
    color: 'black',
    x: 64,
    y: 0,

  });

  columnText3 = new Text({
    text: '2',
    font: '20px Arial',
    color: 'black',
    x: 128,
    y: 0,

  });
  columnText4 = new Text({
    text: '4',
    font: '20px Arial',
    color: 'black',
    x: 196,
    y: 0,

  });
  columnText5 = new Text({
    text: '6',
    font: '20px Arial',
    color: 'black',
    x: 256,
    y: 0,

  });
  columnText6 = new Text({
    text: '4',
    font: '20px Arial',
    color: 'black',
    x: 320,
    y: 0,
  });
  columnText7 = new Text({
    text: '10',
    font: '20px Arial',
    color: 'black',
    x: 384,
    y: 0,

  });

  columnText8 = new Text({
    text: '3',
    font: '20px Arial',
    color: 'black',
    x: 448,
    y: 0,

  });

  rowText1 = new Text({
    text: '5',
    font: '20px Arial',
    color: 'black',
    x: 490,
    y: 40,
  });

  rowText2 = new Text({
    text: '4',
    font: '20px Arial',
    color: 'black',
    x: 490,
    y: 104,
  });

  rowText3 = new Text({
    text: '6',
    font: '20px Arial',
    color: 'black',
    x: 490,
    y: 168,
  });

  rowText4 = new Text({
    text: '2',
    font: '20px Arial',
    color: 'black',
    x: 490,
    y: 232,
  });

  rowText5 = new Text({
    text: '9',
    font: '20px Arial',
    color: 'black',
    x: 490,
    y: 296,
  });

  rowText6 = new Text({
    text: '7',
    font: '20px Arial',
    color: 'black',
    x: 490,
    y: 360,
  });

  rowText7 = new Text({
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

    this.columnText.render();
    this.columnText2.render();
    this.columnText3.render();
    this.columnText4.render();
    this.columnText5.render();
    this.columnText6.render();
    this.columnText7.render();
    this.columnText8.render();

    this.rowText1.render();
    this.rowText2.render();
    this.rowText3.render();
    this.rowText4.render();
    this.rowText5.render();
    this.rowText6.render();
    this.rowText7.render();
  }
}