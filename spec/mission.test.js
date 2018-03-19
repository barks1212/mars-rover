const { expect } = require('chai');
const Mission = require('../mission');

describe('Mission', () => {
  it('creates a landing plateau', () => {
    const mission = new Mission(5, 5);
    expect(mission.plateau).to.eql({x:5, y:5});
  });

  it('adds rovers to an array', () => {
    const mission = new Mission(5, 5);
    mission.addRover(3, 3);
    mission.addRover(3, 4);
    expect(mission.rovers).to.have.lengthOf(2);
  });

  it('cannot land rovers outside of the plateau', () => {
    const mission = new Mission(5, 5);
    expect(mission.addRover(6, 6)).to.equal('ERROR: Cannot land outside plateau bounds');
  });

  it('cannot land two rovers in the same position', () => {
    const mission = new Mission(5 , 5);
    mission.addRover(3, 3);
    expect(mission.addRover(3, 3)).to.equal('ERROR: Imminent collision!');
  });

  it('provides instructions as a string to each rover which then executes them', () => {
    const mission = new Mission(5, 5);
    mission.addRover(3, 3, 'N');
    mission.followInstructions('MLMR', mission.rovers[0]);
    expect(mission.rovers[0].getRoverPosition()).to.equal('2 4 N');
  });

  it('lists final position of each rover in a single string', () => {
    const mission = new Mission(5, 5);
    mission.addRover(3, 3, 'N');
    mission.addRover(4, 4, 'S');
    mission.addRover(2, 2, 'E');
    
    mission.rovers.forEach((rover) => {
      mission.followInstructions('MLM', rover);
    });
    expect(mission.getFinalRoverPositions()).to.equal('2 4 W \n 5 3 E \n 3 3 N');
  });
});