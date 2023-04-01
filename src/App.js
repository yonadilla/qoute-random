import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';


library.add(faTwitter)
function App() {
  const [quote, setQuote] = useState({text: "", author: ""});

  useEffect(() => {
      fetchQuote();
  }, [])
  
  const fetchQuote = () => {
    axios
          .get("https://type.fit/api/quotes")
          .then((response) =>{
            const data = response.data;
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomQuote = data[randomIndex]
            const text = randomQuote.text;
            const author = randomQuote.author;
            setQuote({text, author});
            console.log(randomQuote.author) 
          })  
          .catch((error) => {
            console.log(error);
          });
          
  };

    const tweetQuote = () => {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
      window.open (twitterUrl, '_blank');
    }


  return (
    <div id="quote-box">
        <h1 id="text">" {quote.text} "</h1>
        <p id="author"> - {quote.author}</p>
        <div id="button">
        <a id="tweet-quote" href = {`https://twitter.com/intent/tweet?te  xt=${quote.text} - ${quote.author}`} target = '_blank' ><FontAwesomeIcon icon={faTwitter} /></a>
        <button id="new-quote"onClick={fetchQuote}>next</button>        
        </div>
    </div>
    
  );
}

export default App;
