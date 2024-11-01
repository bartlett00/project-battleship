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

  gameboards.appendChild(playerArea);
  gameboards.appendChild(computerArea);

  body.appendChild(gameboards);
}
buildDOM();

function startGame() {}
