"use client";

import React, { useState, useEffect } from "react";

class MyBoard {
  size: number;
  board: Array<Array<{ x: number; y: number; state: boolean }>>;

  constructor(size = 10, initialBoard?: MyBoard) {
    this.size = size;
    this.board = initialBoard ? initialBoard.board : this.initializeBoard();
  }

  initializeBoard() {
    const board = [];

    for (let i = 0; i < this.size; i++) {
      let row = [];

      for (let j = 0; j < this.size; j++) {
        row.push({ x: i, y: j, state: false });
      }

      board.push(row);
    }

    return board;
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

  toggleCell(x: number, y: number) {
    this.board[x][y].state = !this.board[x][y].state;
  }

  countAliveNeighbours(x: number, y: number) {
    let aliveNeighbours = 0;
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if (
          i >= 0 &&
          i < this.size &&
          j >= 0 &&
          j < this.size &&
          !(i === x && j === y)
          ) {
          if (this.board[i][j].state) {
            aliveNeighbours++;
          }
        }
      }
    }
    return aliveNeighbours;
  }

  computeNextTurn() {
    const newBoard = this.initializeBoard();
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j].state) {
          if (this.countAliveNeighbours(i, j) < 2 || this.countAliveNeighbours(i, j) > 3) {
            newBoard[i][j] = { x: i, y: j, state: false };
          }
          if (this.countAliveNeighbours(i, j) === 2 || this.countAliveNeighbours(i, j) === 3) {
            newBoard[i][j] = { x: i, y: j, state: true };
          }
        } else {
          if (this.countAliveNeighbours(i, j) === 3) {
            newBoard[i][j] = { x: i, y: j, state: true };
          }
        }
      }
    }

    this.board = newBoard;
  }
}

function BoardComponent() {
  const [board, setBoard] = useState(new MyBoard(100));

  const handleCellClick = (x: number, y: number) => {
    const newBoard = new MyBoard(board.size, board);
    newBoard.toggleCell(x, y);
    setBoard(newBoard);
  };

  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    let turn: NodeJS.Timeout;

    if (!paused) {
      turn = setInterval(() => {
        setCount((oldCount) => oldCount + 1);
        board.computeNextTurn();
      }, 100);
    }

    return () => {
      clearInterval(turn);
    };
  }, [paused]);

  const handlePause = () => {
    setPaused(!paused);
  };

  return (
    <>
      <table className="board">
        <tbody>
          {board.getBoard().map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) =>
                cell.state ? (
                  <td
                    onClick={() => handleCellClick(cell.x, cell.y)}
                    className="cell cell-on"
                    key={cellIndex}
                  >
                    {/* {board.countAliveNeighbours(cell.x, cell.y)} */}
                  </td>
                ) : (
                  <td
                    className="cell cell-off"
                    onClick={() => handleCellClick(cell.x, cell.y)}
                    key={cellIndex}
                  >
                    {/* {cell.x}{cell.y} */}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="turn-counter-box">
        <p>Current turn: {count}</p>
        <button onClick={handlePause}>{paused ? "Resume" : "Pause"}</button>
      </div>
    </>
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
