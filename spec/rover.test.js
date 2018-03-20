
const { expect } = require('chai');
const Rover = require('../src/rover');

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
    rover.move(6, 6);
    expect(rover.getPosition()).to.equal('5 6 N');
  });

  it('combines rotate and move to go to a new position', () => {
    const rover = new Rover(5, 5,'N');
    rover.rotate('L');
    rover.move(6, 6);
    expect(rover.getPosition()).to.equal('4 5 W');
    rover.move(6, 6);
    rover.rotate('R');
    rover.move(6, 6);
    expect(rover.getPosition()).to.equal('3 6 N');
  });

  it('wont allow a rover to move out of bounds and the rover maintains its current position', () => {
    const rover = new Rover(5, 5, 'N');
    expect(rover.move(5, 5)).to.equal('Next move goes out of bounds! Aborting move!');
    expect(rover.getPosition()).to.equal('5 5 N');
  });

  it('wont allow a rover to crash into another rover and maintains its position', () => {
    const rovers = [
      {x: 2, y:3, heading: 'N'},
    ];
    const rover = new Rover(2, 2, 'N');
    expect(rover.move(5, 5, rovers)).to.equal('Imminent collision! Aborting move!');
    expect(rover.getPosition()).to.equal('2 2 N');
  });
});
