const Rover = require('./rover');

class Mission {
  constructor(instructions) {
    this.instructions = instructions;
    this.plateau = {
      x: instructions === undefined ? 5 : instructions[0],
      y: instructions === undefined ? 5 : instructions[2]
    };
    this.rovers = [];
  }

  launchMission() {
    if (typeof this.instructions !== 'string') return 'Please enter valid mission instructions. Instructions must be a string with each command seperated by a \\n';

    if (this.instructions.length < 15) return 'Please enter more detailed mission instructions';

    else {
      const instructionStr = this.instructions.split(' \n ').join('').replace(/\s/g, '');
      const seperateCommandsRegex = /[\d]{2}[A-Z]*/g;
      const seperateCommands = instructionStr.slice(2).match(seperateCommandsRegex);
      seperateCommands.forEach((command) => {
        const commandArr = command.slice(0, 3).split('');
        this.addRover(parseInt(commandArr[0]), parseInt(commandArr[1]), commandArr[2]);
      });

      for (let i = 0; i < this.rovers.length; i++) {
        this.rovers[i].followInstructions(seperateCommands[i].slice(3));
      }
      return this.getFinalRoverPositions();
    }
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
    return theresARover.length ? false : true;
  }

  addRover(x, y, heading) {
    if (this.isWithinBounds(x, y) && this.checkForRovers(x, y)) {
      const rover = new Rover(x, y, heading);
      this.rovers.push(rover);
    }
    else if (!this.isWithinBounds(x, y) && this.checkForRovers(x, y)) {
      return 'ERROR: Cannot land outside plateau bounds';
    }
    else if (this.isWithinBounds(x, y) && !this.checkForRovers(x, y)) {
      return 'ERROR: Imminent collision!';
    }
    else return 'FATAL ERROR';
  }

  getFinalRoverPositions() {
    return this.rovers.map((rover) => {
      return rover.getPosition();
    }).join(' \n ');
  }

}

module.exports = Mission;