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
    this.colsWith13Sums = [];
    this.rowsWith13Sums = [];
    this.populateColsAndRowsWith13Sums();
    this.grid = this.createGrid(sprite, this.getColsWith13Sums.bind(this), this.getRowsWith13Sums.bind(this), this.updateNumbers.bind(this), this.getCurrentLevel.bind(this));
    this.background = this.createBackground();
    this.level = 1;
  }

  getCurrentLevel() {
    return this.level;
  }

  getColsWith13Sums() {
    return this.colsWith13Sums;
  }

  getRowsWith13Sums() {
    return this.rowsWith13Sums;
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

  updateNumbers() {
    //remove first element of horizontalNumbers and verticalNumbers and add a random number between 1 and 9 at the end of the array
    this.horizontalNumbers.shift();
    this.horizontalNumbers.push(Math.floor(Math.random() * 9) + 1);
    this.verticalNumbers.shift();
    this.verticalNumbers.push(Math.floor(Math.random() * 9) + 1);
    this.updateNumberTexts();
    this.populateColsAndRowsWith13Sums();
  }

  populateColsAndRowsWith13Sums() {
    this.colsWith13Sums = [];
    this.rowsWith13Sums = [];
    for (let i = 0; i < this.numberOfColumns; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        if (this.horizontalNumbers[i] + this.verticalNumbers[j] === 13) {
          this.colsWith13Sums.push(i);
          this.rowsWith13Sums.push(j);
        }
      }
    }
  }

  //create a method for updating the numbers in the rows and columns
  updateNumberTexts() {
    this.horizontalTexts = [];
    this.verticalTexts = [];
    for (let i = 0; i < this.numberOfColumns; i++) {
      const squareSize = 64;
      const fontOffset = 5;
      this.horizontalTexts.push(new Text({
        text: this.horizontalNumbers[i].toString(),
        font: '20px Arial',
        color: 'white',
        x: i * 64 + squareSize / 2 - fontOffset + squareSize,
        y: squareSize / 2 - fontOffset,
      }));

      this.verticalTexts.push(new Text({
        text: this.verticalNumbers[i].toString(),
        font: '20px Arial',
        color: 'white',
        x: squareSize / 2 - fontOffset / 2,
        y: i * 64 + squareSize / 2 - fontOffset * 2 + 64,
      }));
    }
  }


  //create a method for creating the grid
  createGrid(image, colsWith13Sums, rowsWith13Sums, updateNumbers, currentLevel) {
    return Sprite({
      x: 0,
      y: 0,
      image: image,
      level: 1,
      levelColors: [
        '#e78ea799',
        '#e38a3a99',
        '#729d3f99',
        '#aa4d8d99',
        '#9fd7dd99',
        '#ffffff99',
        '#44444499'

      ],
      greenColor: '#41772f',
      redColor: '#ae3b2f',

      // required for an image sprite
      render: function () {
        const tileSize = 64; // Size of each tile
        const numRows = 8;
        const numCols = 8;
        const green = '#41772f';
        const red = '#ae3b2f';

        // Define different tile colors
        const colors = ['#e78ea799'];

        // Loop through rows and columns to draw tiles
        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numCols; col++) {
            // Calculate the x and y position of the tile
            const x = col * tileSize;
            const y = row * tileSize;

            // Determine the color of the tile based on row and column
            const colorIndex = (row + col) % 2;
            if (colorIndex == 0 && row != 0 && col != 0) {
              const tileColor = this.levelColors[currentLevel() - 1];
              // Draw the tile
              this.context.fillStyle = tileColor;
              this.context.fillRect(x, y, tileSize, tileSize);
              this.context.drawImage(this.image, 0, 0, tileSize, tileSize, x, y, tileSize, tileSize);
            }
            if (row == 0 && col != 0) {
              const tileColor = colsWith13Sums().includes(col - 1) ? red : green;
              // Draw the tile
              this.context.fillStyle = tileColor;
              this.context.fillRect(x + 20, y + 8, 26, 13);
              this.context.drawImage(this.image, tileSize, 0, tileSize, tileSize, x, y, tileSize, tileSize);
            }
            if (col == 0 && row != 0) {
              const tileColor = rowsWith13Sums().includes(row - 1) ? red : green;
              this.context.fillStyle = tileColor;
              this.context.fillRect(x + 8, y + 20, 13, 26);
              this.context.save();
              this.context.translate(x, y + tileSize);
              this.context.rotate(-Math.PI / 2);
              this.context.drawImage(this.image, tileSize, 0, tileSize, tileSize, 0, 0, tileSize, tileSize);
              this.context.restore();
            }
          }
        }
      },
      update: function (dt) {
        //updateNumbers every 5 seconds
        this.timeSinceLastUpdate = this.timeSinceLastUpdate || 0;
        this.timeSinceLastUpdate += dt;
        if (this.timeSinceLastUpdate > 5 / currentLevel()) {
          updateNumbers();
          this.timeSinceLastUpdate = 0;
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
    this.grid.update(dt);
  }

  render() {
    this.background.render();
    this.grid.render();
    this.horizontalTexts.forEach(text => text.render());
    this.verticalTexts.forEach(text => text.render());

  }
}