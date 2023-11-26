import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import './MainBox.css';
import { LuRefreshCcw } from "react-icons/lu";
import xLogo from './images/xLogo.png';
import oLogo from './images/oLogo.png';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const EMPTY = '';
const initialBoard = Array(9).fill(EMPTY);

const logicalMove = (board, humanValue, compValue) => {

  // Check if the computer can win in the next move
  for (let i = 0; i < board.length; i++) {
    if (board[i] === EMPTY) {
      const newBoard = [...board];
      newBoard[i] = compValue;
      if (checkWinner(newBoard, compValue)) {
        return i;
      }
    }
  }

  // Check if the human can win in the next move and block them
  for (let i = 0; i < board.length; i++) {
    if (board[i] === EMPTY) {
      const newBoard = [...board];
      newBoard[i] = humanValue;
      if (checkWinner(newBoard, humanValue)) {
        return i;
      }
    }
  }

  // simple random move if there is no logical move.
  return getRandomEmptyCell(board);
};

const getRandomEmptyCell = (board) => {
  const emptyCells = board.reduce((accumulator, cell, index) => {
    if (cell === EMPTY) {
      accumulator.push(index);
    }
    return accumulator;
  }, []);

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

const checkWinner = (board, currentPlayer) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      board[a] && board[a].props.src === currentPlayer.props.src &&
      board[b] && board[b].props.src === currentPlayer.props.src &&
      board[c] && board[c].props.src === currentPlayer.props.src
    ) {
      return true;
    }
  }
  return false;
};

const TicTacToe = ({ human, computer }) => {
  const navigation = useNavigate();
  let humanValue, compValue;

  if (human === 'X') {
    humanValue = <img src={xLogo}></img>;
    compValue = <img src={oLogo}></img>;
  } else {
    humanValue = <img src={oLogo} ></img>;
    compValue = <img src={xLogo} ></img>;
  }


  const [board, setBoard] = useState(initialBoard);
  const [humanTurn, sethumanTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  let [humanScore, setHumanScore] = useState(0);
  let [compScore, setCompScore] = useState(0);
  let [tieScore, setTieScore] = useState(0);

  useEffect(() => {
    if (!humanTurn && winner === null) {
      const timeoutId = setTimeout(() => {
        const logicalIndex = logicalMove(board, humanValue, compValue);
        makeMove(logicalIndex);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [humanTurn, board, winner, humanValue, compValue]);

  const makeMove = (index) => {
    if (board[index] === EMPTY && winner === null) {
      const newBoard = [...board];
      const currentPlayer = humanTurn ? humanValue : compValue;

      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      if (checkWinner(newBoard, currentPlayer)) {
        setWinner(currentPlayer);
        if (currentPlayer === humanValue) {
          setHumanScore(humanScore + 1);
          localStorage.setItem('humanScore', humanScore + 1);
          navigation(`/result/${human}/human`);
        } else {
          setCompScore(compScore + 1);
          localStorage.setItem('compScore', compScore + 1);
          navigation(`/result/${computer}/comp`);
        }
      } else if (!newBoard.includes(EMPTY)) {
        setWinner('Tie');
        setTieScore(tieScore + 1);
        localStorage.setItem('tieScore', tieScore + 1);
      } else {
        sethumanTurn(!humanTurn);
      }
    }

  };


  const renderCell = (index) => (
    <div
      className={`cell ${board[index]}`}
      key={index}
      onClick={() => makeMove(index)}
    >
      {board[index]}
    </div>
  );

  const resetGame = () => {
    setBoard(initialBoard);
    sethumanTurn(true);
    setWinner(null);
  };


  return (
    <div className="main-box">
      <div className="heading-box">
        <div className="heading">
          <div id="logo-heading">
            <div className='game-logo'>
              <span id='x'>
                <img src={xLogo} />
              </span>
              <span id='o'>
                <img src={oLogo} />
              </span>
            </div >
          </div >
        </div >
        <div className="heading">
          <div className="cell" id='player-turn'>{humanTurn ? human : computer} TURN</div>
        </div>
        <div className="heading">
          <LuRefreshCcw id='refresh-btn' onClick={resetGame} />
        </div>
      </div >

      <div className="board">
        {board.map((cell, index) => renderCell(index))}
      </div>

      <div className="result-box">
        <div className='result' id="human-result">{human} (YOU) <br /> {localStorage.getItem('humanScore') || 0}</div>
        <div className='result' id="tie-result">TIES <br /> {localStorage.getItem('tieScore') || 0}</div>
        <div className='result' id="comp-result">{computer} (CPU) <br /> {localStorage.getItem('compScore') || 0}</div>
      </div>

    </div >
  );
};

export default TicTacToe;
