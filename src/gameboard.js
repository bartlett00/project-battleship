import Ship from "./ship";

export default function GameBoard() {
  /*
      placeShip method
        creates new ship
        saves ship across specific coordinates

      receiveAttack method
        accepts pair of coordinates
        if coordinates contain part of a ship
          call hit function on correct ship
        else
          record coords of miss

      tracks missed shots
      checkForDefeat method
        if all ships are sunk
          return true
    */
  function createTile(row, col) {
    return {
      x: row,
      y: col,
      ship: null,
      hit: false,
      miss: false,
    };
  }

  function generateBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      let column = [];
      for (let j = 0; j < 10; j++) {
        let newTile = createTile(j, i);
        column.push(newTile);
      }
      board.push(column);
    }
    return board;
  }
  let board = generateBoard();
  //stores refs to all ships on the board
  let fleet = [];

  // start and end are arrays in format of [x, y]
  const placeShip = (start, end, shipType, shipSize) => {
    const startX = start[0];
    const startY = start[1];
    const endX = end[0];
    const endY = end[1];

    if (startX < 0 || startY < 0 || endX < 0 || endY < 0) {
      throw new Error("cannot place ship outside of board!");
    }

    let newShip = Ship(shipType, shipSize);
    fleet.push(newShip);

    if (startX == endX) {
      if (startY < endY) {
        for (let i = startY; i <= endY; i++) {
          board[startX][i].ship = newShip;
        }
      } else if (startY > endY) {
        for (let i = startY; i >= endY; i--) {
          board[startX][i].ship = newShip;
        }
      }
    } else if (startY == endY) {
      if (startX < endX) {
        for (let i = startX; i <= endX; i++) {
          board[i][startY].ship = newShip;
        }
      } else if (startX > endX) {
        for (let i = startX; i >= endX; i--) {
          board[i][startY].ship = newShip;
        }
      }
    }
    //if x is the same, only increment/decrement y
    //if y is the same, only increment/decrement x
    //ships can only be placed vertically or horizontally
  };

  const receiveAttack = (x, y) => {
    if (board[x][y].ship !== null) {
      board[x][y].hit = true;
      board[x][y].ship.hit();
    } else {
      board[x][y].miss = true;
    }
  };

  const checkDefeat = () => {
    let defeatedShips = 0;
    for (let i = 0; i < fleet.length; i++) {
      if (fleet[i].isSunk()) {
        defeatedShips++;
      }
    }

    if (defeatedShips == fleet.length) {
      return true;
    } else {
      return false;
    }
  };

  return { board, placeShip, receiveAttack, checkDefeat };
}
