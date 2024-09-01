import { GameObjectClass, Sprite, Text } from 'kontra';


export default class AreaSquare {

  numberOfRows = 10;
  numberOfColumns = 8;
  areaSquare = Sprite({
    x: 0,
    y: 0,
    // required for an image sprite
    render: function() {
      const tileSize = 64; // Size of each tile
      //const numRows = canvas.height / tileSize;
      //const numCols = canvas.width / tileSize;
  
      const numRows = 10;
      const numCols = 8;

      // Define different tile colors
      const colors = ['#1100EE', '#EE1100'];
  

      // Calculate the x and y position of the tile
      //const x = col * tileSize;
      //const y = row * tileSize;

      // Draw the tile
      this.context.fillStyle = '#1100EE';
      this.context.fillRect(30, 40, tileSize, tileSize);

    }
  });

  update(dt, gameState) {
    
  }

  render(gameState) {
    this.areaSquare.render();
  }
}