class Plateau {
  constructor(x, y) {
    this.plateauBounds = {
      x: x === undefined ? 5 : x,
      y: y === undefined ? 5: y
    };
  }

  getBounds() {
    return Object.values(this.plateauBounds);
  }

  isWithinBounds(x, y) {
    const boundsArr = this.getBounds();
    return (
      x <= boundsArr[0] && y <= boundsArr[1] && x > -1 && y > -1
    );
  }
}

module.exports = Plateau;