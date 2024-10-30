import Ship from "./ship";
import createShipList from "./create-ship-list";
const list = createShipList();
const destroyer = list.destroyer;
const patrolBoat = list.patrolBoat;
let testShip = Ship(destroyer.name, destroyer.size);

test("isSunk returns true if ship has no hits remaining.", () => {
  let hitTestShip = Ship(patrolBoat.name, patrolBoat.size);
  hitTestShip.hit();
  hitTestShip.hit();
  expect(hitTestShip.isSunk()).toBeTruthy();
});

test("ship tracks how many hits received.", () => {
  let newShip = Ship(destroyer.name, destroyer.size);
  newShip.hit();
  expect(newShip.checkDamage()).toBe(1);
});
