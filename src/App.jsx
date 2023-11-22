import './App.css';
import QuoteBox from './Components/Quotebox/QuoteBox';
import MainBox from './Components/GameBox/MainBox';
import {BrowserRouter as Router } from 'react-router-dom';


function App() {

  return (
    <Router>
      <div className='main-page'>
        <QuoteBox />
        <MainBox />
      </div>
    </Router>
  )
}

export default App
