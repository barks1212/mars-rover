class Rover {
  constructor(x, y, heading) {
    this.x = x;
    this.y = y;
    this.heading = heading;
  }

  getRoverPosition() {
    return `${this.x} ${this.y} ${this.heading}`;
  }

  rotateRover(command) {
    const rotateHandler = {
      N: { L: 'W', R: 'E' },
      S: { L: 'E', R: 'W' },
      E: { L: 'N', R: 'S' },
      W: { L: 'S', R: 'N' }
    };
    this.heading = rotateHandler[this.heading][command];
  }

  moveRover() {
    let x = 0, y = 0;

    switch (this.heading) {
    case 'N':
      y++;
      break;
    case 'S':
      y--;
      break;
    case 'E':
      x++;
      break;
    case 'W':
      x--;
      break;
    }
    this.x += x;
    this.y += y;
  }
}



module.exports = Rover;