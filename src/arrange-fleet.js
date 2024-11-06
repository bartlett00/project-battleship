//player sets up board
export default function arrangeFleet() {
  /*
      button that randomizes ship placement
      button that starts game after ships are placed
        ships must be placed before game starts
    */
  let messageBox = document.querySelector("#messages");
  messageBox.textContent = "Place your ships!";

  let randomizeBtn = document.createElement("button");
  randomizeBtn.id = "randomize-btn";
  randomizeBtn.classList.add("btn");
  randomizeBtn.textContent = "Randomize Fleet";
  randomizeBtn.addEventListener("click", () => {
    randomizeShips();
    //start fresh with randomize ships
    //break file up into modules
    //needs to work for both player and computer
  });

  let startBtn = document.createElement("button");
  startBtn.id = "start-btn";
  startBtn.classList.add("btn");
  startBtn.textContent = "Start the Game!";
  startBtn.addEventListener("click", () => {
    startGame();
  });

  let btnContainer = document.createElement("div");
  btnContainer.id = "game-setup-btns";
  btnContainer.appendChild(randomizeBtn);
  btnContainer.appendChild(startBtn);

  document.querySelector("body").appendChild(btnContainer);

  function randomizeShips(player) {
    let list = createShipList();
    let fleet = {
      carrier: {
        data: list.carrier,
        count: 1,
      },
      battleship: {
        data: list.battleship,
        count: 2,
      },
      destroyer: {
        data: list.destroyer,
        count: 3,
      },
      submarine: {
        data: list.submarine,
        count: 4,
      },
      patrolBoat: {
        data: list.patrolBoat,
        count: 5,
      },
    };

    function generateValidStartpoint() {
      let randomX = Math.floor(Math.random() * 10);
      let randomY = Math.floor(Math.random() * 10);
      //check if start point does not overlap
      let shipStartPoint = player.gameboard.board[randomX][randomY];
      if (shipStartPoint.ship === null) {
        return shipStartPoint;
      }
    }

    function generateValidEndpoint(startpoint) {
      //randomize vertical or horizontal
      let endX;
      let endY;
      let vertOrHori = Math.floor(Math.random() * 2);
      if (vertOrHori === 0) {
        //randomize positve or negative direction
        let positiveOrNegative = Math.floor(Math.random() * 2);
        if (positiveOrNegative == 0) {
          endX = startpoint.x + (shipType.data.size - 1);
        } else {
          endX = startpoint.x - (shipType.data.size - 1);
        }
      } else if (vertOrHori === 1) {
        let positiveOrNegative = Math.floor(Math.random() * 2);
        if (positiveOrNegative == 0) {
          endY = startpoint.y + (shipType.data.size - 1);
        } else {
          endY = startpoint.y - (shipType.data.size - 1);
        }
      }
      return { endX, endY };
    }

    function checkOverlap(start, end) {
      //check axis of ship placement (hori. or vert.)
      //check if end => start moves forward or backward
      //check if each tile from start => end is empty
      let isOverlap = false;
      if (start.x == end.x) {
        if (start.y < end.y) {
          for (let i = start.y; i < end.y; i++) {
            if (player.gameboard.board[start.x][i].ship !== null) {
              isOverlap = true;
            }
          }
        } else {
          for (let i = start.y; i > end.y; i--) {
            if (player.gameboard.board[start.x][i].ship !== null) {
              isOverlap = true;
            }
          }
        }
      } else {
        if (start.x < end.x) {
          for (let i = start.x; i < end.x; i++) {
            if (player.gameboard.board[i][start.y].ship !== null) {
              isOverlap = true;
            }
          }
        } else {
          for (let i = start.x; i > end.x; i--) {
            if (player.gameboard.board[i][start.y].ship !== null) {
              isOverlap = true;
            }
          }
        }
      }
      return isOverlap;
    }

    function placeShipOnUI(start, end) {
      if (start.x == end.x) {
        if (start.y < end.y) {
          for (let i = start.y; i < end.y; i++) {
            document
              .querySelector(`[data-y="${i}}"][data-x="${start.x}"]`)
              .classList.add("player-ship");
          }
        } else if (start.y > end.y) {
          for (let i = start.y; i > end.y; i--) {
            document
              .querySelector(`[data-y="${i}}"][data-x="${start.x}"]`)
              .classList.add("player-ship");
          }
        }
      } else {
        if (start.x < end.x) {
          for (let i = start.x; i < end.x; i++) {
            document
              .querySelector(`[data-y="${start.y}}"][data-x="${i}"]`)
              .classList.add("player-ship");
          }
        } else {
          for (let i = start.x; i < end.x; i--) {
            document
              .querySelector(`[data-y="${start.y}}"][data-x="${i}"]`)
              .classList.add("player-ship");
          }
        }
      }
    }

    /*
        for each ship in fleet
          randomly select start point
          randomly select direction
          check for overlap
        repeat until fleet total count = 0
      */
    for (let shipType in fleet) {
      while ([shipType].count > 0) {
        let startpoint = generateValidStartpoint();
        let endpointCoords = generateValidEndpoint(startpoint);
        let endpoint =
          player.gameboard.board[endpointCoords.endX][endpointCoords.endY];
        //check if there is no overlap
        while (checkOverlap(startpoint, endpoint) == true) {
          startpoint = generateValidStartpoint();
          endpointCoords = generateValidEndpoint(startpoint);
          endpoint =
            player.gameboard.board[endpointCoords.endX][endpointCoords.endY];
        }
        let start = [startpoint.x, startpoint.y];
        let end = [endpoint.x, endpoint.y];
        player.gameboard.board.placeShip(
          start,
          end,
          shipType.data.name,
          shipType.data.size
        );
        placeShipOnUI(start, end);
        [shipType].count = [shipType].count - 1;
      }
    }
  }
}
