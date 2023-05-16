class MyBoard {
  size: number;
  board: { x: number; y: number; state: boolean }[][];

  constructor(size = 10) {
    this.size = size;
    this.board = [];

    for (let i = 0; i < size; i++) {
      let row = [];

      for (let j = 0; j < size; j++) {
        row.push({ x: i, y: j, state: false });
      }

      this.board.push(row);
    }
  }

  getBoard() {
    return this.board;
  }

  getCell(x: number, y: number) {
    return this.board[x][y];
  }

  setCellOn(x: number, y: number) {
    this.board[x][y].state = true;
  }

  setCellOff(x: number, y: number) {
    this.board[x][y].state = false;
  }
}

function BoardComponent() {
  let board = new MyBoard(10);

  board.setCellOn(1, 2);
  board.setCellOn(5, 8);

  return (
    <table className="board">
      <tbody>
        {board.getBoard().map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) =>
              cell.state ? (
                <td className="cell-on" key={cellIndex}>
                  {cell.x}
                  {cell.y}
                </td>
              ) : (
                <td className="cell-off" key={cellIndex}>
                  {cell.x}
                  {cell.y}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Home() {
  return (
    <main>
      <div className="content">
        <BoardComponent />
      </div>
    </main>
  );
}
