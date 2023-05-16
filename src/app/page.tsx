import { createElement } from "react";


let cell = <td className="cell"></td>

function Row({ size=10 }) {

  let row = [];
  for (let i = 0; i < size; i++) {
    row.push(
      cell
    )
  }
  return <>{row}</>;
}

function Board({ size=10 }) {

  let board = [];
  for (let i = 0; i < size; i++) {
    board.push(      
      <tr><Row size={size}/></tr>
    )
  }
  return <>{board}</>;
}

export default function Home() {

  let tbody = <tbody><Board size={10}/></tbody>

  let table = <table className="board">{tbody}</table>

  return (
    <main>
      <div className="content">
        {table}
      </div>
    </main>
  );
}
