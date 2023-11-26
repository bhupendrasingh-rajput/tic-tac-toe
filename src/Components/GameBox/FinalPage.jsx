import React, { useState } from 'react'
import './MainBox.css';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import xLogo from './images/xLogo.png';
import oLogo from './images/oLogo.png';
import { useNavigate } from 'react-router-dom';


export const WinnerPage = () => {
    const { winner, value } = useParams();
    const winnerString = value === 'human' ? 'YOU' : 'CPU';
    const winnerImage = winner === 'X' ? <img src={xLogo} /> : <img src={oLogo} />;
    const navigation = useNavigate();

    const handleQuit = () => {
        navigation('/tic-tac-toe');
    }

    const handleNextRound = () => {
        const prevHumanScore = localStorage.getItem('humanScore');
        const prevCompScore = localStorage.getItem('compScore');
        const prevTieScore = localStorage.getItem('tieScore');
        
        navigation(`/vsCPU/${prevHumanScore}/${prevCompScore}/${prevTieScore}`);
    }

    return (
        <div className="main-box" id='winner-box-id'>
            <div className="winner-box">
                <p id='win-heading'>{winnerString} WON !</p>
                <p id='win-image-heading'>{winnerImage} &nbsp;&nbsp; TAKES THE ROUND</p>
                <div className="buttons">
                    <button onClick={handleQuit} className='btns' id='quit-btn'>QUIT</button>
                    <button onClick={handleNextRound} className='btns' id='next-round-btn'>NEXT ROUND</button>
                </div>
            </div>
        </div>
    )
};

export const LossPage = () => {
    return (
        <div className="winner-box">
            <div className="winner-box">
                <p>DO YOU WANT TO QUIT ?</p>
                <div className="buttons">
                    <button>PLAY AGAIN</button>
                    <button>QUIT</button>
                </div>
            </div>
        </div>
    )
};


