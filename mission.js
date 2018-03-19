const Rover = require('./rover');

class Mission {
  constructor(x, y) {
    this.plateau = {
      x,
      y
    };
    this.rovers = [];
  }

  isWithinBounds(x, y) {
    return (
      x <= this.plateau.x && y <= this.plateau.y && x > -1 && y > -1
    );
  }

  checkForRovers(x, y) {
    const theresARover = this.rovers.filter((rover) => {
      return x === rover.x && y === rover.y;
    });
    return theresARover.length ?  false : true;
  }

  addRover(x, y, heading) {
    if (this.isWithinBounds(x, y) && this.checkForRovers(x, y)) {
      const rover = new Rover(x, y, heading);
      this.rovers.push(rover);
    }
    else if (!this.isWithinBounds(x, y) && this.checkForRovers(x, y)) {
      return 'ERROR: Cannot land outside plateau bounds';
    }
    else if (this.isWithinBounds(x ,y) && !this.checkForRovers(x, y)) {
      return 'ERROR: Imminent collision!';
    }
    else return 'FATAL ERROR';
  }

  followInstructions(commandStr, rover) {
    const commandArr = commandStr.split('');
    commandArr.forEach((command) => {
      if (command === 'M') rover.moveRover();
      if (command === 'L' || command === 'R') rover.rotateRover(command);
    });
  }

  getFinalRoverPositions() {
    return this.rovers.map((rover) => {
      return rover.getRoverPosition();
    }).join(' \n ');
  }

}

module.exports = Mission;