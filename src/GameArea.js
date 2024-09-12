import { GameObjectClass, Sprite, Text } from 'kontra';
import generateStars from './SkyGenerator';
import play from './Audio';

export default class GameArea {

  constructor(sprite) {
    this.sprite = sprite;
    this.columnTexts = []
    this.numberOfColumns = 8;
    this.level = 1;
    this.levelSpeed = 1;
    this.horizontalNumbers = [];
    this.verticalNumbers = [];
    this.populateNumbers();
    this.horizontalTexts = [];
    this.verticalTexts = [];
    this.updateNumberTexts();
    this.colsWith13Sums = [];
    this.rowsWith13Sums = [];
    this.tilesWith13Sums = [];
    this.warningTiles = [];
    this.populateColsAndRowsWith13Sums();
    this.populateWarningTiles();
    // this.grid = this.createGrid(sprite, this.getColsWith13Sums.bind(this), this.getRowsWith13Sums.bind(this), this.updateNumbers.bind(this), this.getCurrentLevel.bind(this));
    this.grid = this.resetGrid();
    this.background = this.createBackground();
  }

  startLevel() {
    this.horizontalNumbers = [];
    this.verticalNumbers = [];
    this.populateNumbers();
    this.updateNumberTexts();
    this.populateColsAndRowsWith13Sums();
    this.populateWarningTiles();
    this.resetGrid();
  }

  setLevelSpeed() {
    this.levelSpeed = 1 + this.level / 2;
  }

  resetGrid() {
    console.log(this.getCurrentLevel());
    return this.createGrid(this.sprite, this.getColsWith13Sums.bind(this), this.getRowsWith13Sums.bind(this), this.updateNumbers.bind(this), this.getCurrentLevel.bind(this));
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
      // this.horizontalNumbers.push(Math.floor(Math.random() * 9) + 1);
      this.horizontalNumbers.push(i % 5 + 1);
      //push random integers between 1 and 9 into the verticalNumbers array
      // this.verticalNumbers.push(Math.floor(Math.random() * 9) + 1);
      this.verticalNumbers.push(i % 5 + 1);
    }
    if (this.horizontalNumbers[3] + this.verticalNumbers[3] === 13) {
      this.horizontalNumbers = [];
      this.verticalNumbers = [];
      this.populateNumbers();
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
    this.populateWarningTiles();
    play('update');
  }

  populateColsAndRowsWith13Sums() {
    this.colsWith13Sums = [];
    this.rowsWith13Sums = [];
    this.tilesWith13Sums = [];
    let count = 0;
    for (let i = 0; i < this.numberOfColumns - 1; i++) {
      for (let j = 0; j < this.numberOfColumns - 1; j++) {
        count++;
        if (this.horizontalNumbers[i] + this.verticalNumbers[j] === 13) {
          this.colsWith13Sums.push(i);
          this.rowsWith13Sums.push(j);
          this.tilesWith13Sums.push({ x: i, y: j });
        }
      }
    }
  }

  populateWarningTiles() {
    this.warningTiles = [];
    this.tilesWith13Sums.forEach(tile => {
      this.warningTiles.push(Sprite({
        x: tile.x * 64 + 64,
        y: tile.y * 64 + 64,
        color: '#ae3b2f',
        alpha: 255,
        width: 64,
        height: 64,
        render: function () {
          const color = `${this.color}${this.alpha.toString(16).padStart(2, '0')}`;
          this.context.fillStyle = color;
          this.context.fillRect(0, 0, this.width, this.height);
        },
        update: function (dt) {
          this.alpha = this.alpha - Math.floor(dt * 200);
          if (this.alpha < 0) {
            this.alpha = 0;
          }
        }
      }));

    });
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
      tileSize: 64,
      numRows: 8,
      green: '#41772f',
      red: '#ae3b2f',
      getLevelSpeed: function () {
        const startIntervall = 2;
        const updatedFactor = 0.1;
        return startIntervall / (1 + (currentLevel() - 1) * updatedFactor);
      },
      drawCanon: function (x, y, red = false, rotated = false) {
        if (!rotated) {
          if (x !== 8 * this.tileSize) {
            const tileColor = red ? this.red : this.green;
            this.context.fillStyle = tileColor;
            this.context.fillRect(x + 20, y + 8, 26, 13);
          }
          this.context.drawImage(this.image, this.tileSize, 0, this.tileSize, this.tileSize, x, y, this.tileSize, this.tileSize);
        }
        if (rotated) {
          if (y !== 8 * this.tileSize) {
            const tileColor = red ? this.red : this.green;
            this.context.fillStyle = tileColor;
            this.context.fillRect(x + 8, y + 20, 13, 26);
          }
          this.context.save();
          this.context.translate(x, y + this.tileSize);
          this.context.rotate(-Math.PI / 2);
          this.context.drawImage(this.image, this.tileSize, 0, this.tileSize, this.tileSize, 0, 0, this.tileSize, this.tileSize);
          this.context.restore();
        }
      },

      // required for an image sprite
      render: function () {
        // Loop through rows and columns to draw tiles
        for (let row = 0; row < this.numRows; row++) {
          for (let col = 0; col < this.numRows; col++) {
            // Calculate the x and y position of the tile
            const x = col * this.tileSize;
            const y = row * this.tileSize;

            // Determine the color of the tile based on row and column
            const colorIndex = (row + col) % 2;
            if (colorIndex == 0 && row != 0 && col != 0) {
              const tileColor = this.levelColors[currentLevel() % this.levelColors.length];
              // Draw the tile
              this.context.fillStyle = tileColor;
              this.context.fillRect(x, y, this.tileSize, this.tileSize);
              this.context.drawImage(this.image, 0, 0, this.tileSize, this.tileSize, x, y, this.tileSize, this.tileSize);
            }
            if (row == 0 && col != 0) {
              this.drawCanon(x, y, colsWith13Sums().includes(col - 1));
            }
            if (col == 0 && row != 0) {
              this.drawCanon(x, y, rowsWith13Sums().includes(row - 1), true);
            }
          }
        }
        this.drawCanon(0, 8 * this.tileSize, false, true);
        this.drawCanon(8 * this.tileSize, 0, false, false);
      },
      update: function (dt) {
        //updateNumbers every 5 seconds
        this.timeSinceLastUpdate = this.timeSinceLastUpdate || 0;
        this.timeSinceLastUpdate += dt;
        if (this.timeSinceLastUpdate > this.getLevelSpeed()) {
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
    this.warningTiles.forEach(tile => tile.update(dt));
  }

  render() {
    this.background.render();
    this.grid.render();
    this.warningTiles.forEach(tile => tile.render());
    this.horizontalTexts.forEach(text => text.render());
    this.verticalTexts.forEach(text => text.render());
  }
}