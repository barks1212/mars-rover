class Rover {
  constructor(x, y, heading) {
    this.x = x === undefined ? Math.round(Math.random() * (5 - 0)) : x;
    this.y = y === undefined ? Math.round(Math.random() * (5 - 0)) : y;
    this.heading = heading;
  }

  getPosition() {
    return `${this.x} ${this.y} ${this.heading}`;
  }

  followInstructions(commandStr) {
    const commandArr = commandStr.split('');
    commandArr.forEach((command) => {
      command = command.toUpperCase();
      if (command === 'M') this.move();
      if (command === 'L' || command === 'R') this.rotate(command);
    });
  }

  rotate(command) {
    command = command.toUpperCase();
    const rotateHandler = {
      N: { L: 'W', R: 'E' },
      S: { L: 'E', R: 'W' },
      E: { L: 'N', R: 'S' },
      W: { L: 'S', R: 'N' }
    };
    this.heading = rotateHandler[this.heading][command];
  }

  move() {
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