const { expect } = require('chai');
const Mission = require('../mission');

describe('Mission', () => {
  it('creates a landing plateau', () => {
    const mission = new Mission();
    expect(mission.plateau).to.eql({x:5, y:5});
  });

  it('adds rovers to an array', () => {
    const mission = new Mission();
    mission.addRover(3, 3);
    mission.addRover(3, 4);
    expect(mission.rovers).to.have.lengthOf(2);
  });

  it('cannot land rovers outside of the plateau', () => {
    const mission = new Mission();
    expect(mission.addRover(6, 6)).to.equal('ERROR: Cannot land outside plateau bounds');
  });

  it('cannot land two rovers in the same position', () => {
    const mission = new Mission();
    mission.addRover(3, 3);
    expect(mission.addRover(3, 3)).to.equal('ERROR: Imminent collision!');
  });

  it('lists final position of each rover in a single string', () => {
    const mission = new Mission();
    mission.addRover(3, 3, 'N');
    mission.addRover(4, 4, 'S');
    mission.addRover(2, 2, 'E');
    expect(mission.getFinalRoverPositions()).to.equal('3 3 N \n 4 4 S \n 2 2 E');
  });

  it('takes a list of mission instructions and launches the mission', () => {
    const mission = new Mission('5 5 \n 1 2 N \n LMLMLMLMM \n 3 3 E \n MMRMMRMRRM');
    expect(mission.launchMission()).to.equal('1 3 N \n 5 1 E');
  });

  it('returns an error message when given invalid instruction data type', () => {
    const mission = new Mission(1234);
    expect(mission.launchMission()).to.equal('Please enter valid mission instructions. Instructions must be a string with each command seperated by a \\n');
  });

  it('returns an error message when given instructions that are too short', () => {
    const mission = new Mission('5, 5, 1');
    expect(mission.launchMission()).to.equal('Please enter more detailed mission instructions');
  });
});