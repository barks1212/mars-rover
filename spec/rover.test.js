const { expect } = require('chai');
const Rover = require('../rover');

describe('Rover', () => {
  it('creates a new rover and can retrieve its initial position, returned as a string', () => {
    const rover = new Rover(5, 5, 'N');
    expect(rover.getPosition()).to.equal('5 5 N');
  });
  
  it('rotates the rover to a new heading when given an instruction of "L" or "R"', () => {
    const rover = new Rover(5, 5, 'N');
    rover.rotate('L');
    expect(rover.getPosition()).to.equal('5 5 W');
  });

  it('moves the rover forward to a new position', () => {
    const rover = new Rover(5, 5, 'N');
    rover.move();
    expect(rover.getPosition()).to.equal('5 6 N');
  });

  it('combines rotate and move to go to a new position', () => {
    const rover = new Rover(5, 5,'N');
    rover.rotate('L');
    rover.move();
    expect(rover.getPosition()).to.equal('4 5 W');
    rover.move();
    rover.rotate('R');
    rover.move();
    expect(rover.getPosition()).to.equal('3 6 N');
  });

  it('takes a string of instructions and executes them', () => {
    const rover = new Rover(5, 5, 'N');
    rover.followInstructions('LMMLMMRRRM');
    expect(rover.getPosition()).to.equal('4 3 E');
  });
});
