import { useEffect, useState } from "react";
import { getQuotesFromApi, addQuotes } from "./services/taskServices.js";
import { Link } from "react-router-dom";

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
      <li key={value._id}>
        <Link to={value._id}>
          Quote: {value.quote}, Source: {value.source}
        </Link>
      </li>
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
    <div>
      SIEMA KURWA
      <h2>QUOTES</h2>
      <ul>{items}</ul>
      <form onSubmit={addNewQuote}>
        <input
          value={enteredQuote}
          onChange={quoteChangerHandler}
          type="text"
          placeholder="Quote"
          required
          max="500"
          min="1"
        />
        <input
          value={enteredSource}
          type="text"
          placeholder="Source"
          onChange={sourceChangerHandler}
        />
        <button type="submit">Add new Quote</button>
      </form>
    </div>
  );
}

export default App;
