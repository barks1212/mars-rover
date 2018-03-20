const { expect } = require('chai');
const Plateau = require('../plateau');

describe('Plateau', () => {
  it('creates a new mission Plateau when given its upper-right bounds', () => {
    const plateau = new Plateau(5, 4);
    expect(plateau.plateauBounds.x).to.equal(5);
    expect(plateau.plateauBounds.y).to.equal(4);
  });

  it('creates a new mission Plateau with a default size when bounds are undefined', () => {
    const plateau = new Plateau();
    expect(plateau.plateauBounds.x).to.equal(5);
    expect(plateau.plateauBounds.y).to.equal(5);
  });

  it('calls a method to return its upper-right bounds in an array', () => {
    const plateau = new Plateau(4, 4);
    expect(plateau.getBounds()).to.eql([4, 4]);
  });

  it('has a method to check whether a given set of bounds fall outside of the plateau', () => {
    const plateau = new Plateau(5, 5);
    expect(plateau.isWithinBounds(3, 3)).to.be.true;
    expect(plateau.isWithinBounds(6, 6)).to.be.false;
  });
});