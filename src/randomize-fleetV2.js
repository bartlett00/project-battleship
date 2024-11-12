import createShipList from "./create-ship-list";
export default function randomizeFleet(playerData, computerData) {
  //random startpoint method
  //startpoint will always be on the board
  function randomizeShips(playerData) {
    function createStart() {
      let randomX = Math.floor(Math.random() * 10);
      let randomY = Math.floor(Math.random() * 10);
      return [randomX, randomY];
    }

    //check if point is within the board
    function isOnBoard(coordinate) {
      if (
        coordinate[0] < 10 &&
        coordinate[0] >= 0 &&
        coordinate[1] < 10 &&
        coordinate[1] > 0
      ) {
        return true;
      } else {
        return false;
      }
    }

    //returns true if a ship already exists at tile
    function isOverlapping(point, playerBoard) {
      let pointX = point[0];
      let pointY = point[1];
      let pointOnBoard = playerBoard[pointX][pointY];

      if (pointOnBoard.ship !== null) {
        return true;
      } else {
        return false;
      }
    }

    //returns VALID endpoint (does not overlap)
    function createEnd(start, shipLength, playerBoard) {
      let possibileEnds = [];
      let validEnds = [];
      let startX = start[0];
      let startY = start[1];
      let shipSizeOnBoard = shipLength - 1;
      possibileEnds.push(
        [startX + shipSizeOnBoard, startY],
        [startX - shipSizeOnBoard, startY],
        [startX, startY + shipSizeOnBoard],
        [startX, startY - shipSizeOnBoard]
      );
      for (let i = 0; i < possibileEnds.length; i++) {
        if (
          isOnBoard(possibileEnds[i]) &&
          !isOverlapping(possibileEnds[i], playerBoard)
        ) {
          validEnds.push(possibileEnds[i]);
        }
      }
      if (validEnds.length == 0) {
        return null;
      } else {
        return validEnds[Math.floor(Math.random() * (validEnds.length - 1))];
      }
    }

    // check if points from start => end do not overlap with other ships
    function isShipOverlapping(start, end, playerBoard) {
      if (end == null) {
        return true;
      }
      if (end[0] != start[0]) {
        if (start[0] < end[0]) {
          for (let i = start[0]; i <= end[0]; i++) {
            if (isOverlapping([i, start[1]], playerBoard)) {
              return true;
            }
          }
          return false;
        } else {
          for (let i = start[0]; i >= end[0]; i--) {
            if (isOverlapping([i, start[1]], playerBoard)) {
              return true;
            }
          }
          return false;
        }
      } else {
        if (start[1] < end[1]) {
          for (let i = start[1]; i <= end[1]; i++) {
            if (isOverlapping([start[0], i], playerBoard)) {
              return true;
            }
          }
          return false;
        } else {
          for (let i = start[1]; i >= end[1]; i--) {
            if (isOverlapping([start[0], i], playerBoard)) {
              return true;
            }
          }
          return false;
        }
      }
    }

    function createValidShipCoords(shipLength, playerBoard) {
      let start = createStart();
      let end = createEnd(start, shipLength, playerBoard);
      let isOverlapping = isShipOverlapping(start, end, playerBoard);
      while (isOverlapping == true) {
        start = createStart();
        end = createEnd(start, shipLength, playerBoard);
        isOverlapping = isShipOverlapping(start, end, playerBoard);
      }
      return [start, end];
    }

    function placeShipsOnUI(playerBoard) {
      let tiles = document.querySelector(".player-board").childNodes;
      for (let i = 0; i < tiles.length; i++) {
        let x = tiles[i].dataset.x;
        let y = tiles[i].dataset.y;
        if (playerBoard[x][y].ship != null) {
          tiles[i].classList.add("player-ship");
          tiles[i].classList.add(`${playerBoard[x][y].ship.shipClass}`);
        }
      }
    }

    let list = createShipList();
    let fleet = [
      {
        data: list.carrier,
        count: 1,
      },
      {
        data: list.battleship,
        count: 1,
      },
      {
        data: list.destroyer,
        count: 1,
      },
      {
        data: list.submarine,
        count: 1,
      },
      {
        data: list.patrolBoat,
        count: 1,
      },
      {
        data: list.battleship,
        count: 1,
      },
      {
        data: list.patrolBoat,
        count: 1,
      },
      {
        data: list.submarine,
        count: 1,
      },
    ];

    for (let i = 0; i < fleet.length; i++) {
      let [newStart, newEnd] = createValidShipCoords(
        fleet[i].data.size,
        playerData.gameboard.board
      );
      playerData.gameboard.placeShip(
        newStart,
        newEnd,
        fleet[i].data.name,
        fleet[i].data.size
      );
    }

    if (playerData.playerName == "player") {
      placeShipsOnUI(playerData.gameboard.board);
    }
  }
  randomizeShips(playerData);
  randomizeShips(computerData);
}
