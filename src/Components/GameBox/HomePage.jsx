import React, { useState } from 'react'
import './MainBox.css';
import xLogo from './images/xLogo.png';
import oLogo from './images/oLogo.png';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HomePage = ({ selectPlayer }) => {
    const handleInviteClick = () => {
        toast.success('Invite Link Copied !', {
            position: 'top-right',
            autoClose: 3000,
            pauseOnHover: true,
            draggable: true,
        });
    };


    return (

        <div className="main-box">


            <div className='game-logo'>
                <span id='x'>
                    <img src={xLogo} />
                </span>
                <span id='o'>
                    <img src={oLogo} />
                </span>
            </div>

            <div className="pick-player">
                <p>PICK PLAYER</p>
                <span className="toggle">
                    <button id='x-btn' onClick={() => {
                        selectPlayer('X')
                    }}>X</button>
                    <button id='o-btn' onClick={() => {
                        selectPlayer('O')
                    }}>O</button>
                </span>
            </div >

            <div className='start-buttons'>
                <Link to='/vsCPU' className='start-btn' id='vsCPU'>NEW GAME ( VS CPU )</Link>
                <Link className='start-btn' id='vsHuman'>NEW GAME ( VS HUMAN ) Coming soon</Link>
            </div>

            <div className="invite-button">
                <button className='invite-btn' onClick={handleInviteClick}>Invite Friend</button>
                <ToastContainer
                    toastStyle={{
                        width: '70%',
                        height: '10%',
                        'border-radius': '0.5rem',
                        display: 'flex',
                        'align-items': 'center',
                        'justify-content': 'center',
                        background: 'rgba(25, 42, 50, 1)',
                        color: 'rgba(242, 178, 55, 1)',
                        float: 'right',
                    }}
                />
            </div>

        </div >

    )
}

export default HomePage;
