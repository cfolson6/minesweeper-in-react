export default class Board {
  constructor(rows, columns, mines, startX, startY) {
    this.hasMine = [];
    this.isOpen = []; // if a square is open, it has been clicked
    this.isFlagged = [];
    this.mines = mines;
    this.minesUnFlagged = mines;
    this.squaresRevealed = 0;
    this.gameLost = false;

    // creating board arrays
    for (let i = 0; i < rows; i++) {
      this.hasMine[i] = [];
      this.isOpen[i] = [];
      this.isFlagged[i] = [];
      for (let j = 0; j < columns; j++) {
        this.hasMine[i][j] = false;
        this.isOpen[i][j] = false;
        this.isFlagged[i][j] = false;
      }
    }

    // placing mines
    for (let i = 1; i <= mines; i++) {
      let placedMine = false;
      while (!placedMine) {
        let x = Math.floor(Math.random() * rows);
        let y = Math.floor(Math.random() * columns);
        if (
          !this.hasMine[x][y] &&
          (x > startX + 1 || x < startX - 1 || y > startY + 1 || y < startY - 1)
        ) {
          this.hasMine[x][y] = true;
          placedMine = true;
        }
      }
    }

    this.click(startX, startY);
  } // end constructor

  click(x, y) {
    if (this.gameOver()) return 0; // don't do anything if the game is over

    if (this.hasMine[x][y]) {
      this.gameLost = true; // if we clicked on a mine, the game is over
      return 0;
    }

    this.isOpen[x][y] = true;
    console.log(x + ", " + y + " set to " + this.isOpen[x][y]);
    this.squaresRevealed++;

    // recursively clicks if number is 0
    if (this.getNumber(x, y) === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (
            x + i >= 0 &&
            x + i < this.isOpen.length &&
            y + j >= 0 &&
            y + j < this.isOpen[0].length &&
            this.isOpen[x + i][y + j] === false
          ) {
            console.log(
              x +
                i +
                ", " +
                (y + j) +
                ": " +
                this.isOpen[x + i][y + j] +
                ", recursively clicking"
            );
            this.click(x + i, y + j);
          }
        }
      }
    }
  } // end click method

  // gets the number of mines adjacent to a square
  getNumber(x, y) {
    let number = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          x + i >= 0 &&
          x + i < this.isOpen.length &&
          y + j >= 0 &&
          y + j < this.isOpen[0].length &&
          this.hasMine[x + i][y + j]
        )
          number++;
      }
    }

    console.log("Square: " + x + ", " + y + ". Number: " + number);

    return number;
  } // end getNumber method

  flagUnFlag(x, y) {
    if (this.gameOver()) return 0; // don't do anything if the game is over

    this.isFlagged[x][y] = !this.isFlagged[x][y];
    if (this.isFlagged[x][y]) {
      this.minesUnFlagged--;
    } else {
      this.minesUnFlagged++;
    }
  }

  // the special click with left and right mouse
  leftRightClick(x, y) {
    let adjacentFlags = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (this.isFlagged[x + i][y + j]) adjacentFlags++;
      }
    }

    if (adjacentFlags === this.getNumber[x][y]) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (
            this.isOpen[x + i][y + j] === false &&
            this.isFlagged[x + i][y + j] === false
          ) {
            this.click(x + i, y + j);
          }
        }
      }
    }
  } // end leftRightClick method

  gameWon() {
    return (
      this.squaresRevealed >=
      this.hasMine.length * this.hasMine[0].length - this.mines
    );
  }

  // returns true if the game has been won or lost, false otherwise
  gameOver() {
    return this.gameWon() || this.gameLost;
  }

  getIsOpen(x, y) {
    return this.isOpen[x][y];
  }

  getHasMine(x, y) {
    return this.hasMine[x][y];
  }

  getIsFlagged(x, y) {
    return this.isFlagged[x][y];
  }
}
