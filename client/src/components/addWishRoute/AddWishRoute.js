import "./AddWishRoute";
import { useState } from "react";
import { addQuotes } from "../../services/taskServices.js";


const AddWishRoute = () => {
    const [enteredQuote, setEnteredQuote] = useState("");
    const [enteredSource, setEnteredSource] = useState("");


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
  };



  return (
    <div>
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
    </div>
  );
};

export default AddWishRoute;
