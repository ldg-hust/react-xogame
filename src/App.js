import { useState } from "react";

function Square({ value, onSquare }) {
  return (
    <button
      className="square"
      onClick={onSquare}>{value}
    </button>)
}
function Board({ squares, isNext, onplay }) {

  function handClick(i) {
    if (squares[i] || winner) return
    const nextSquares = squares.slice()
    if (isNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = "O"
    }

    onplay(nextSquares)
  }
  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = "winner is " + winner
  } else {
    status = "next player is " + (isNext ? 'X' : 'O')
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquare={() => { handClick(0) }} />
        <Square value={squares[1]} onSquare={() => { handClick(1) }} />
        <Square value={squares[2]} onSquare={() => { handClick(2) }} />

      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquare={() => { handClick(3) }} />
        <Square value={squares[4]} onSquare={() => { handClick(4) }} />
        <Square value={squares[5]} onSquare={() => { handClick(5) }} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquare={() => { handClick(6) }} />
        <Square value={squares[7]} onSquare={() => { handClick(7) }} />
        <Square value={squares[8]} onSquare={() => { handClick(8) }} />
      </div>

    </>

  );
}
function App() {
  const [history, setHistory] = useState([new Array(9).fill(null)])
  //const [isNext, setisNext] = useState(true)
  const [currentMove, setCurrentMove] = useState(0)
  const isNext = currentMove % 2 === 0
  const current = history[currentMove]

  function handClick(nextSquares) {
    const nextHistory = ([...history.slice(0, currentMove + 1), nextSquares])
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
    // setisNext(!isNext)
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
    // setisNext(nextMove % 2 === 0)
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start'
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })
  return (
    <div className="game">

      <div className="game-board">
        <Board squares={current} isNext={isNext} onplay={handClick} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>

    </div>
  )
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a]
  }
  return null
}
export default App;
