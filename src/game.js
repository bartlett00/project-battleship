import Ship from "./ship";
import GameBoard from "./gameboard";
import Player from "./player";
import createShipList from "./create-ship-list";
import "./styles.css";

console.log("test");

function buildDOM() {
  let body = document.querySelector("body");
  let gameboards = document.createElement("div");
  gameboards.id = "gameboards";

  function createBoard() {
    let boardContainer = document.createElement("div");
    boardContainer.classList.add("board");
    for (let i = 9; i >= 0; i--) {
      for (let j = 0; j < 10; j++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.y = i;
        tile.dataset.x = j;
        boardContainer.appendChild(tile);
      }
    }
    return boardContainer;
  }

  let boardLabels = document.createElement("div");
  boardLabels.id = "board-labels";
  let playerLabel = document.createElement("div");
  playerLabel.id = "player-label";
  playerLabel.textContent = "Your Board";
  let computerLabel = document.createElement("div");
  computerLabel.id = "computer-label";
  computerLabel.textContent = "Opponent's Board";

  let playerBoard = createBoard();
  playerBoard.classList.add("player-board");
  let playerArea = document.createElement("div");
  playerArea.id = "player-area";
  playerArea.appendChild(playerLabel);
  playerArea.appendChild(playerBoard);

  let computerBoard = createBoard();
  computerBoard.classList.add("computer-board");
  let computerArea = document.createElement("div");
  computerArea.id = "computer-area";
  computerArea.appendChild(computerLabel);
  computerArea.appendChild(computerBoard);

  //container for displaying messages
  let messageContainer = document.createElement("div");
  messageContainer.id = "messages";

  gameboards.appendChild(playerArea);
  gameboards.appendChild(computerArea);

  body.appendChild(gameboards);
  body.appendChild(messageContainer);
}

function startGame() {
  //reset message box
  let messageBox = document.querySelector("#messages");
  messageBox.textContent = "Click a tile on your opponent's board to attack!";

  let shipList = createShipList();
  //create players
  let player = Player("player");
  let computer = Player("computer");

  //place ships for testing
  player.gameboard.placeShip(
    [0, 0],
    [0, 3],
    shipList.battleship.name,
    shipList.battleship.size
  );
  player.gameboard.placeShip(
    [3, 5],
    [4, 5],
    shipList.patrolBoat.name,
    shipList.patrolBoat.size
  );

  computer.gameboard.placeShip(
    [0, 0],
    [0, 3],
    shipList.battleship.name,
    shipList.battleship.size
  );
  computer.gameboard.placeShip(
    [3, 5],
    [4, 5],
    shipList.patrolBoat.name,
    shipList.patrolBoat.size
  );

  //event listener(s) only need to listen for player actions
  //computer actions will always immediately follow

  let playerBoard = document.querySelector(".player-board");
  let computerBoard = document.querySelector(".computer-board");

  let tileListPlayer = playerBoard.childNodes;
  let tileListComp = computerBoard.childNodes;

  function playComputerTurn() {
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);
    let attackedTile = player.gameboard.board[randomX][randomY];

    //create new number if attack has already been attempted
    while (attackedTile.attacked == true) {
      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);
      attackedTile = player.gameboard.board[randomX][randomY];
    }

    let query = `[data-y="${randomY}"][data-x="${randomX}"]`;
    let randomTile = document.querySelector(query);
    player.gameboard.receiveAttack(randomX, randomY);

    if (
      player.gameboard.receiveAttack(randomTile.dataset.x, randomTile.dataset.y)
    ) {
      randomTile.classList.add("computer-hit");
    } else {
      randomTile.classList.add("computer-miss");
    }
    if (player.gameboard.checkDefeat()) {
      endGame(player.playerName);
    }
  }

  function endGame(defeatedPlayer) {
    //called when a player wins
    let messageContainer = document.querySelector("#messages");
    messageContainer.textContent = `${defeatedPlayer} is defeated!`;
  }

  function attachTileListeners(nodeList, playerType) {
    for (let i = 0; i < nodeList.length; i++) {
      let tile = nodeList[i];
      let tileX = tile.dataset.x;
      let tileY = tile.dataset.y;
      let tileOnBoard = playerType.gameboard.board[tileX][tileY];
      tile.addEventListener("click", () => {
        //cant interact with the same tile twice
        if (tileOnBoard.attacked == false) {
          // playerType.gameboard.receiveAttack(tileX, tileY);
          if (playerType.gameboard.receiveAttack(tileX, tileY)) {
            tile.classList.add("hit");
          } else {
            tile.classList.add("miss");
          }
          if (playerType.gameboard.checkDefeat()) {
            endGame(playerType.playerName);
          }
          playComputerTurn();
        } else {
          console.log("cannot play the same tile twice.");
        }
      });
    }
  }
  attachTileListeners(tileListComp, computer);
}

function arrangeFleet() {
  /*
    player selects ship type from list
    selects starting tile
    selects ending tile
      
    until all ships are placed on board

  */
  let messageBox = document.querySelector("#messages");
}

//basic layout generates, player places ships, then game starts
buildDOM();
//arrangeFleet();
startGame();
