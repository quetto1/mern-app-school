import { useEffect, useState } from "react";
import { getQuotesFromApi, addQuotes } from "./services/taskServices.js";
import { Link } from "react-router-dom";
import "./FrontPage.css";


function App() {
  const [quotes, setQuotes] = useState([]);
  const [enteredQuote, setEnteredQuote] = useState("");
  const [enteredSource, setEnteredSource] = useState("");

  useEffect(() => {
    getQuotes();
  }, []);

  // Fetches the Quotes from the API
  async function getQuotes() {
    const quotes = await getQuotesFromApi();
    setQuotes(quotes);
  }

  // Puts Quotes into a variable that can be displayed inside of JSX
  const items = [];
  for (const value of quotes) {
    items.push(
      <div key={value._id}>
        
        {/* Wish component creation */}
        {/* TODO: If theres gonna be enough time MOVE IT to A separate component */}
      <div className="wish-wrapper">
        <div className="wish-title"><Link to={value._id}>Wish: {value.quote}</Link></div>
        <div className="wish-link">Link: "dummy link"</div>
        <div className="wish-description">Description: 
        Lorem asdasdasdas Lorem asdasdasdas Lorem asdasdasdas Lorem asdasdasdas Lorem asdasdasdas Lorem asdasdasdas  {value.source}</div>
        <div className="wish-footer">
          <div className="wish-comment-count">Comments: 18</div>
          <div className="wish-date">Date: 14-12-2021</div> 
        </div>
      </div>
      </div>
    );
  }

  // Read the input changes and save it in useSate
  const quoteChangerHandler = (event) => {
    setEnteredQuote(event.target.value);
  };

  const sourceChangerHandler = (event) => {
    setEnteredSource(event.target.value);
  };

  // Handels the submit from function, takes the addQuote function and then saves is in prepered schema
  const addNewQuote = async (e) => {
    e.preventDefault();

    // Makes a POST request to the API
    await addQuotes({
      quote: enteredQuote,
      source: enteredSource,
      comments: [],
    });

    // Reset the input fields
    setEnteredSource("");
    setEnteredQuote("");
    // Refetches the new quotes
    getQuotes();
  };

  // TODO: Make it look like https://material.io/components/cards
  return (
    <div className="front-page-wrapper">
      <h1>Wish List!</h1>
      <h2>Description...</h2>
      {/* Add Wish form */}
      <form onSubmit={addNewQuote}>
        <input
          value={enteredQuote}
          onChange={quoteChangerHandler}
          type="text"
          placeholder="Wish"
          required
          max="500"
          min="1"
        />
        <input
          value={enteredSource}
          type="text"
          placeholder="Description"
          onChange={sourceChangerHandler}
        />
        <button type="submit">Add new Quote</button>
      </form>
      {/*displayed wishes*/}
      <ul>{items}</ul>
      
    </div>
  );
}

export default App;
