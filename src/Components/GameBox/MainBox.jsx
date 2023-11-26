import React, { useState } from 'react';
import './MainBox.css';
import HomePage from './HomePage';
import TicTacToe from './TicTacToe';
import { Routes, Route } from 'react-router-dom';
import { WinnerPage } from './FinalPage';


function MainBox() {

  //Logic For Picking Player
  const [human, setHuman] = useState(null);
  const [computer, setComputer] = useState(null);


  const selectPlayer = (value) => {
    setHuman(value);
    const compValue = value === 'X' ? 'O' : 'X';
    setComputer(compValue);
  }
  console.log("Human", human);
  console.log("Computer", computer);


  return (
    <div className="mainbox-area">
      <Routes>
        <Route exact path='/tic-tac-toe' element={<HomePage selectPlayer={selectPlayer} />} />
        <Route path='/vsCPU/*' element={<TicTacToe human={human} computer={computer} />} />
        <Route path="/result/:winner/:value" element={<WinnerPage />} />
      </Routes>
    </div>
  )

}

export default MainBox;