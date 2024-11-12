import Player from "./player";
import "./styles.css";
import buildDOM from "./build-dom";
import randomizeFleet from "./randomize-fleetV2";

function startGame() {
  //reset message box
  let messageBox = document.querySelector("#messages");
  messageBox.textContent = "Click a tile on your opponent's board to attack!";

  //create players
  let player = Player("player");
  let computer = Player("computer");
  randomizeFleet(player, computer);

  document.querySelector("#randomize-btn").addEventListener("click", () => {
    if (
      confirm(
        "This will reset the game. Are you sure you want to randomize the board?"
      )
    ) {
      resetGame();
    }
  });

  let computerBoard = document.querySelector(".computer-board");
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

  function resetGame() {
    //clears body, rebuilds dom, and calls arrangeFleet() + startGame() again
    document.querySelector("body").replaceChildren();
    buildDOM();
    startGame();
  }
  document.querySelector("#reset").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset the game?")) {
      resetGame();
    }
  });

  function endGame(defeatedPlayer) {
    //called when a player wins
    let messageContainer = document.querySelector("#messages");
    messageContainer.textContent = `${defeatedPlayer} is defeated!`;
    let transparentDiv = document.createElement("div");
    transparentDiv.id = "end-screen";
    transparentDiv.textContent = 'Game over! Click "Reset Game" to play again.';
    const body = document.querySelector("body");
    body.appendChild(transparentDiv);
  }

  function attachTileListeners(nodeList, playerType) {
    let gameOver = false;
    for (let i = 0; i < nodeList.length; i++) {
      let tile = nodeList[i];
      let tileX = tile.dataset.x;
      let tileY = tile.dataset.y;
      let tileOnBoard = playerType.gameboard.board[tileX][tileY];

      tile.addEventListener("click", () => {
        //cant interact with the same tile twice
        if (gameOver !== true) {
          if (tileOnBoard.attacked == false) {
            if (playerType.gameboard.receiveAttack(tileX, tileY)) {
              tile.classList.add("hit");
            } else {
              tile.classList.add("miss");
            }
            if (playerType.gameboard.checkDefeat()) {
              endGame(playerType.playerName);
              gameOver = true;
              return;
            }
            playComputerTurn();
          } else {
            console.log("cannot play the same tile twice.");
          }
        }
      });
    }
  }
  attachTileListeners(tileListComp, computer);
}

//basic layout generates, player places ships, then game starts
buildDOM();
startGame();
