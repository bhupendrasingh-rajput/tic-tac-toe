import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuoteBox.css';
import Logo from './refreshLogo.png'

function QuoteBox() {
  const [quoteLine, setQuoteLine] = useState("It is better to fall in originality than to succeed in imitation");
  const [quoteNumber, setQuoteNumber] = useState("1");

  const getQuote = () => {
    axios.get('https://api.adviceslip.com/advice')
      .then((res) => {
        setQuoteNumber(res.data.slip.id);
        console.log(res.data.slip.id);
        setQuoteLine(res.data.slip.advice);
        console.log(res.data.slip.advice);
      })
      .catch((err) => {
        console.log('Something went wrong!');
      });
  }

  useEffect(() => {

    // setup 1 minute interval for getQuote method
    const IntervalId = setInterval(getQuote, 60000);

    // Clean up interval when the component unmounts
    return () => {
      clearInterval(IntervalId);
    };
  }, []);

  return (
    <div className='quotebox-area'>
      <div className="quote-box">
        <div className="upper-heading">
          Quote #{quoteNumber}
        </div>
        <p className="quote-line">
          "{quoteLine}"
        </p>
        <div className="get-quote">
          <button onClick={getQuote}>
            <img src={Logo} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuoteBox;
