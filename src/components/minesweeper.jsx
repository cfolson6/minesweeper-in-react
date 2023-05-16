import React, { Component } from "react";
import Square from "./square.jsx";
import Board from "../Board.js";

class Minesweeper extends Component {
  state = {
    board: null,
  };

  constructor() {
    super();
    this.leftClickHandler = this.leftClickHandler.bind(this);
    this.rightClickHandler = this.rightClickHandler.bind(this);
  }

  makeButtons(rows, columns) {
    let arr = [];
    for (let i = 0; i < rows; i++) {
      let arr2 = [];
      for (let j = 0; j < columns; j++) {
        let n = 9; // empty button
        if (this.state.board !== null) {
          if (this.state.board.getIsOpen(i, j)) {
            n = this.state.board.getNumber(i, j);
          } else if (this.state.board.getIsFlagged(i, j)) {
            if (
              !this.state.board.getHasMine(i, j) &&
              this.state.board.gameOver()
            ) {
              n = 12; // x mine
            } else {
              n = 10; // flag
            }
          } else if (
            this.state.board.gameOver() &&
            this.state.board.getHasMine(i, j)
          ) {
            if (this.state.board.gameWon()) {
              n = 10; // flag, for the last mine(s) that may not be flagged by the user before winning
            } else {
              n = 11; // visible mine
            }
          }
        }

        arr2.push(
          <td>
            <Square
              x={i}
              y={j}
              display={n}
              leftClick={this.leftClickHandler}
              rightClick={this.rightClickHandler}
            />
          </td>
        );
      }
      arr.push(<tr>{arr2}</tr>);
    }
    return arr;
  }

  leftClickHandler(x, y) {
    console.log(x, y);
    if (this.state.board === null) {
      this.setState({ board: new Board(25, 25, 100, x, y) });
    } else {
      this.state.board.click(x, y);
      this.setState({ board: this.state.board });
    }
  }

  rightClickHandler(x, y) {
    console.log(x, y);
    if (this.state.board === null) {
      this.setState({ board: new Board(25, 25, 100, x, y) });
    } else {
      this.state.board.flagUnFlag(x, y);
      this.setState({ board: this.state.board });
    }
  }

  reset = () => {
    this.setState({ board: null });
  };

  getFace() {
    if (this.state.board === null || !this.state.board.gameOver()) {
      return <img src={require("../images/smile.png")} alt="this" />;
    } else if (this.state.board.gameWon()) {
      return <img src={require("../images/sunglasses.png")} alt="this" />;
    } else {
      return <img src={require("../images/dead.png")} alt="this" />;
    }
  }

  render() {
    return (
      <div className="center">
        <button className="button2" onClick={() => this.reset()}>
          {this.getFace()}
        </button>
        <table
          className="minesweeper"
          cellSpacing="0"
          cellPadding="0"
          border="0"
        >
          {this.makeButtons(25, 25)}
        </table>
      </div>
    );
  }
}

export default Minesweeper;
