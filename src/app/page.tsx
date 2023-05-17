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
}

function BoardComponent() {
  const [board, setBoard] = useState(new MyBoard(10));

  const handleCellClick = (x: number, y: number) => {
    const newBoard = new MyBoard(board.size, board);
    newBoard.toggleCell(x, y);
    setBoard(newBoard);
  };

  return (
    <table className="board">
      <tbody>
        {board.getBoard().map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) =>
              cell.state ? (
                <td
                  onClick={() => handleCellClick(cell.x, cell.y)}
                  className="cell-on"
                  key={cellIndex}
                >
                  {cell.x}
                  {cell.y}
                </td>
              ) : (
                <td
                  className="cell-off"
                  onClick={() => handleCellClick(cell.x, cell.y)}
                  key={cellIndex}
                >
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

function TurnCounter() {
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let turn: NodeJS.Timeout;

    if (!paused) {
      turn = setInterval(() => {
        setCount((oldCount) => oldCount + 1);
      }, 1000);
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
      <div>Current turn: {count}</div>
      <button onClick={handlePause}>{paused ? "Resume" : "Pause"}</button>
    </>
  );
}

export default function Home() {
  return (
    <main>
      <div className="content">
        <BoardComponent />
        <TurnCounter />
      </div>
    </main>
  );
}
