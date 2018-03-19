const { expect } = require('chai');
const Rover = require('../rover');

describe('Rover', () => {
  it('creates a new rover and can retrieve its initial position, returned as a string', () => {
    const rover = new Rover(5, 5, 'N');
    expect(rover.getRoverPosition()).to.equal('5 5 N');
  });
  
  it('rotates the rover to a new heading when given an instruction of "L" or "R"', () => {
    const rover = new Rover(5, 5, 'N');
    rover.rotateRover('L');
    expect(rover.getRoverPosition()).to.equal('5 5 W');
  });

  it('moves the rover forward to a new position', () => {
    const rover = new Rover(5, 5, 'N');
    rover.moveRover();
    expect(rover.getRoverPosition()).to.equal('5 6 N');
  });

  it('combines rotate and move to go to a new position', () => {
    const rover = new Rover(5, 5,'N');
    rover.rotateRover('L');
    rover.moveRover();
    expect(rover.getRoverPosition()).to.equal('4 5 W');
    rover.moveRover();
    rover.rotateRover('R');
    rover.moveRover();
    expect(rover.getRoverPosition()).to.equal('3 6 N');
  });
});
