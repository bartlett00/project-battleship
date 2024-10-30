import GameBoard from "./gameboard";
import Ship from "./ship";
import createShipList from "./create-ship-list";
const list = createShipList();
const destroyer = list.destroyer;
const patrolBoat = list.patrolBoat;
let testShip = Ship(patrolBoat.name, patrolBoat.size);

test("Gameboard places ship(s) at specified coordinates.", () => {
  let testBoard = GameBoard();
  testBoard.placeShip([0, 0], [0, 1], patrolBoat.name, patrolBoat.size);
  for (let i = 0; i <= 1; i++) {
    expect(testBoard.board[0][i].ship.name).toBe(testShip.name);
  }
});

test("receiveAttack method damages correct ship on success.", () => {
  let testBoard = GameBoard();
  testBoard.placeShip([0, 0], [0, 1], patrolBoat.name, patrolBoat.size);
  testBoard.receiveAttack(0, 0);
  expect(testBoard.board[0][0].ship.checkDamage()).toBe(1);
});

test("receiveAttack tracks missed shots.", () => {
  let testBoard = GameBoard();
  testBoard.receiveAttack(0, 0);
  expect(testBoard.board[0][0].miss).toBe(true);
});

test("board reports whether all player ships are sunk.", () => {
  let testBoard = GameBoard();
  testBoard.placeShip([0, 0], [2, 0], destroyer.name, destroyer.size);
  testBoard.receiveAttack(0, 0);
  testBoard.receiveAttack(1, 0);
  testBoard.receiveAttack(2, 0);
  expect(testBoard.checkDefeat()).toBeTruthy();
});
