import GameBoard from "./gameboard";

export default function Player(name = "Computer") {
  const playerName = name;
  let gameboard = GameBoard();
  return {
    playerName,
    gameboard,
  };
}
