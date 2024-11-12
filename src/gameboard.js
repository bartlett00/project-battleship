import Ship from "./ship";

export default function GameBoard() {
  function createTile(row, col) {
    return {
      x: row,
      y: col,
      ship: null,
      hit: false,
      miss: false,
      attacked: false,
    };
  }

  function generateBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      let column = [];
      for (let j = 0; j < 10; j++) {
        let newTile = createTile(i, j);
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
      console.log("cannot place ship outside of board!");
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
  };

  const receiveAttack = (x, y) => {
    board[x][y].attacked = true;
    if (board[x][y].ship !== null) {
      board[x][y].hit = true;
      board[x][y].ship.hit();
      console.log(board[x][y].ship.checkDamage());
      return true;
    } else {
      board[x][y].miss = true;
      return false;
    }
  };

  const checkDefeat = () => {
    let defeatedShips = 0;
    for (let i = 0; i < fleet.length; i++) {
      if (fleet[i].isSunk()) {
        defeatedShips++;
      }
    }
    console.log({ defeatedShips, fleet });

    if (defeatedShips === fleet.length) {
      return true;
    } else {
      return false;
    }
  };

  return { board, placeShip, receiveAttack, checkDefeat };
}
