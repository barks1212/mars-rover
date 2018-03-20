
const { expect } = require('chai');
const Mission = require('../src/mission');

describe('Mission', () => {
  it('creates a landing plateau', () => {
    const mission = new Mission('4 4');
    expect(mission.plateau).to.eql({x:4, y:4});
  });

  it('defaults to a 5x5 plateau if bounds are undefined', () => {
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

  it('provides rovers with a string on instructions', () => {
    const mission = new Mission();
    mission.addRover(3, 3, 'N');
    mission.giveRoverInstructions('MLM', mission.rovers[0]);
    expect(mission.getFinalRoverPositions()).to.equal('2 4 W');
  });

  it('returns an error message when passed instructions that arent a string', () => {
    const mission = new Mission();
    mission.addRover(3, 3, 'N');
    expect(mission.giveRoverInstructions(123, mission.rovers[0])).to.equal('invalid instructions');
  });

  it('skips seperate invalid instructions', () => {
    const mission = new Mission();
    mission.addRover(3, 3, 'N');
    mission.giveRoverInstructions('MQM', mission.rovers[0]);
    expect(mission.getFinalRoverPositions()).to.equal('3 5 N');
  });

  it('skips instructions that lead the rover to go out of bounds', () => {
    const mission = new Mission();
    mission.addRover(5, 5, 'N');
    mission.giveRoverInstructions('MLM', mission.rovers[0]);
    expect(mission.getFinalRoverPositions()).to.equal('4 5 W');
  });

  it('skips instructions that lead the rover to crash into another', () => {
    const mission = new Mission();
    mission.addRover(5, 5, 'N');
    mission.addRover(5, 4, 'N');
    mission.giveRoverInstructions('MLM', mission.rovers[1]);
    expect(mission.getFinalRoverPositions()).to.equal('5 5 N \n 4 4 W');
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
