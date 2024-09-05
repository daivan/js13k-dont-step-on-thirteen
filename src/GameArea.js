import { GameObjectClass, Sprite, Text } from 'kontra';
import generateStars from './SkyGenerator';

export default class GameArea {

  constructor(sprite) {
    this.sprite = sprite;
    this.columnTexts = []
    this.numberOfColumns = 8;
    this.horizontalNumbers = [];
    this.verticalNumbers = [];
    this.populateNumbers();
    this.horizontalTexts = [];
    this.verticalTexts = [];
    this.updateNumberTexts();
    this.grid = this.createGrid(sprite);
    this.background = this.createBackground();
  }

  //create a method for populating random numbers in the rows and columns
  populateNumbers() {
    for (let i = 0; i < this.numberOfColumns; i++) {
      //push random integers between 1 and 9 into the horizontalNumbers array
      this.horizontalNumbers.push(Math.floor(Math.random() * 9) + 1);
      //push random integers between 1 and 9 into the verticalNumbers array
      this.verticalNumbers.push(Math.floor(Math.random() * 9) + 1);
    }
  }

  //create a method for updating the numbers in the rows and columns
  updateNumberTexts() {
    for (let i = 0; i < this.numberOfColumns; i++) {
      const squareSize = 64;
      const fontOffset = 5;
      this.horizontalTexts.push(new Text({
        text: this.horizontalNumbers[i].toString(),
        font: '20px Arial',
        color: 'white',
        x: i * 64 + squareSize / 2 - fontOffset + squareSize,
        y: squareSize / 2 - fontOffset * 2,
      }));

      this.verticalTexts.push(new Text({
        text: this.verticalNumbers[i].toString(),
        font: '20px Arial',
        color: 'white',
        x: squareSize / 2 - fontOffset,
        y: i * 64 + squareSize / 2 - fontOffset * 2 + 64,
      }));
    }
  }

  //create a method for creating the grid
  createGrid(image) {
    return Sprite({
      x: 0,
      y: 0,
      image: image,
      // required for an image sprite
      render: function () {
        const tileSize = 64; // Size of each tile
        const numRows = 8;
        const numCols = 8;

        // Define different tile colors
        const colors = ['#e78ea799', '#000000'];

        // Loop through rows and columns to draw tiles
        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numCols; col++) {
            // Calculate the x and y position of the tile
            const x = col * tileSize;
            const y = row * tileSize;

            // Determine the color of the tile based on row and column
            const colorIndex = (row + col) % colors.length;
            if (colorIndex == 0) {
              const tileColor = colors[colorIndex];

              // Draw the tile
              this.context.fillStyle = tileColor;
              this.context.fillRect(x, y, tileSize, tileSize);
              //draw the image
              this.context.drawImage(this.image, x, y, tileSize, tileSize);
            }
          }
        }
      }
    });
  }

  createBackground() {
    return Sprite({
      x: 0,
      y: 0,
      image: generateStars(500)
    });
  }

  update(dt) {

  }

  render() {
    this.background.render();
    this.grid.render();
    this.horizontalTexts.forEach(text => text.render());
    this.verticalTexts.forEach(text => text.render());

  }
}