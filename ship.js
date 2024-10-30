export default function Ship(type, size) {
  let length = size;
  let hitsTaken = 0;
  let sunk = false;
  const shipClass = type;
  const hit = () => {
    hitsTaken++;
  };

  const isSunk = () => {
    if (hitsTaken >= length) {
      sunk = true;
      return sunk;
    } else {
      sunk = false;
      return sunk;
    }
  };

  const checkDamage = () => {
    return hitsTaken;
  };

  return { shipClass, length, sunk, hitsTaken, hit, isSunk, checkDamage };
}
