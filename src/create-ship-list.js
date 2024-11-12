//ships require a size and a name attribute
export default function createShipList() {
  return {
    carrier: {
      name: "Carrier",
      size: 5,
    },
    battleship: {
      name: "Battleship",
      size: 4,
    },
    destroyer: {
      name: "Destroyer",
      size: 3,
    },
    submarine: {
      name: "Submarine",
      size: 3,
    },
    patrolBoat: {
      name: "PatrolBoat",
      size: 2,
    },
  };
}
