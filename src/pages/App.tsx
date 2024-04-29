import React, { useState } from 'react'

type SquareProps = {
  value: 'X' | 'O' | null
  onSquareClick: () => void
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick }): JSX.Element => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

type BoardProps = {
  xIsNext: boolean
  squares: Array<'X' | 'O' | null>
  onPlay: (nextSquares: Array<'X' | 'O' | null>) => void
}

const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }): JSX.Element => {
  const handleClick = (i: number): void => {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status: string
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

export const Game: React.FC = (): JSX.Element => {
  const [xIsNext, setXIsNext] = useState<boolean>(true)
  const [squares, setSquares] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null))
  const [history, setHistory] = useState<Array<Array<'X' | 'O' | null>>>([squares])
  const currentSquares = history[history.length - 1]

  const handlePlay = (nextSquares: Array<'X' | 'O' | null>): void => {
    setHistory([...history, nextSquares])
    setXIsNext(!xIsNext)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  )
}
const calculateWinner = (squares: Array<'X' | 'O' | null>): 'X' | 'O' | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
