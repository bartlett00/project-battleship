import Ship from "./ship";

let testShip = Ship();

test("sunk is a boolean.", () => {
  expect(testShip.sunk === true || testShip.sunk === false).toBeTruthy();
});

test("ship has a length value.", () => {
  expect(typeof testShip.length === "number").toBeTruthy();
});

test("ship tracks how many hits received.", () => {
  expect(typeof testShip.hitsTaken === "number").toBeTruthy();
});
