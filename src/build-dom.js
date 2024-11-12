export default function buildDOM() {
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

  //reset btn
  let resetBtn = document.createElement("button");
  resetBtn.id = "reset";
  resetBtn.textContent = "Reset Game";

  //randomize player ships btn
  let randomizeBtn = document.createElement("button");
  randomizeBtn.id = "randomize-btn";
  randomizeBtn.classList.add("btn");
  randomizeBtn.textContent = "Randomize Fleet";

  //btn container
  let btnContainer = document.createElement("div");
  btnContainer.id = "btn-container";

  gameboards.appendChild(playerArea);
  gameboards.appendChild(computerArea);

  body.appendChild(gameboards);
  body.appendChild(messageContainer);
  btnContainer.appendChild(resetBtn);
  btnContainer.appendChild(randomizeBtn);
  body.appendChild(btnContainer);
}
