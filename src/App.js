import "./App.css";
import Square from "./components/square.jsx";
import "./Board.js";

function makeButtons(rows, columns) {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    let arr2 = [];
    for (let j = 0; j < columns; j++) {
      arr2.push(
        <td>
          <Square x={i} y={j} />
        </td>
      );
    }
    arr.push(<tr>{arr2}</tr>);
  }
  return arr;
}

function App() {
  return (
    <div className="center">
      <table className="minesweeper" cellSpacing="0" cellPadding="0" border="0">
        {makeButtons(25, 25)}
      </table>
    </div>
  );
}

export default App;
