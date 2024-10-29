export default function Ship() {
  let length = 0;
  let hitsTaken = 0;
  let sunk = false;
  const hit = () => {
    hitsTaken++;
  };

  const isSunk = () => {
    if (hitsTaken >= length) {
      sunk = true;
    }
  };
  return { length, hitsTaken, sunk, hit, isSunk };
}
