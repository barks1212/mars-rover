
class Rover {
  constructor(x, y, heading) {
    this.x = x === undefined ? Math.round(Math.random() * (5 - 0)) : x;
    this.y = y === undefined ? Math.round(Math.random() * (5 - 0)) : y;
    this.heading = heading === undefined ? 'N' : heading.toUpperCase();
  }

  getPosition() {
    return `${this.x} ${this.y} ${this.heading}`;
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

  move(boundX, boundY, arr) {
    let nextPos = {
      x: this.x,
      y: this.y
    };
    let x = 0, y = 0, flag = true;

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
    nextPos.x += x;
    nextPos.y += y;
    if (nextPos.x > boundX || nextPos.y > boundY) {
      flag = false;
      return 'Next move goes out of bounds! Aborting move!';
    }
    if (arr === undefined || arr.length === 0) flag = true;
    else {
      for (let i = 0; i < arr.length; i++) {
        if (nextPos.x === arr[i].x && nextPos.y === arr[i].y) {
          flag = false;
          return 'Imminent collision! Aborting move!';
        }
      }
    }
    if (flag === true) {
      this.x = nextPos.x;
      this.y = nextPos.y;
    }
  }
}

module.exports = Rover;
