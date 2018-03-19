const Mission = require('./mission');

class MissionRunner {
  constructor(instructions) {
    this.instructions = instructions;
  }

  runMission() {
    const instructionsArray = this.instructions.split(' ');
    const plateauBounds = instructionsArray.slice(0,2);
    const seperateCommandsRegex = /[\d]{2}[A-Z]*/g;
    const seperateCommands = instructionsArray.slice(2).join('').match(seperateCommandsRegex);

    const mission = new Mission(Number(plateauBounds[0]), Number(plateauBounds[1]));
    seperateCommands.forEach((command) => {
      const commandArr = command.slice(0,3).split('');
      mission.addRover(parseInt(commandArr[0]), parseInt(commandArr[1]), commandArr[2]);
    });

    for (let i = 0; i < mission.rovers.length; i++) {
      mission.followInstructions(seperateCommands[i].slice(3), mission.rovers[i]);
    }
    return mission.getFinalRoverPositions();
  }

}

module.exports = MissionRunner;