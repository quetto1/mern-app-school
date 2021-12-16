import "./AddWishRoute.css";
import { useState } from "react";
import { addQuotes } from "../../services/taskServices.js";


const AddWishRoute = () => {
    const [enteredQuote, setEnteredQuote] = useState("");
    const [enteredSource, setEnteredSource] = useState("");
    const [enteredLink, setEnteredLink] = useState("");


  const quoteChangerHandler = (event) => {
    setEnteredQuote(event.target.value);
  };

  const sourceChangerHandler = (event) => {
    setEnteredSource(event.target.value);
  };

  const linkChangerHandler = (event) => {
    setEnteredLink(event.target.value);
  };

    // Handels the submit from function, takes the addQuote function and then saves is in prepered schema
  const addNewQuote = async (e) => {
    e.preventDefault();

    // Makes a POST request to the API
    const res = await addQuotes({
      quote: enteredQuote,
      source: enteredSource,
      link: enteredLink,
      comments: [],
    });
console.log(res);
    // Reset the input fields
    setEnteredSource("");
    setEnteredQuote("");
    setEnteredLink("");

    alert("A new wish has been submitted")
  };



  return (
    <div className="add-wish-wrapper">
      <h1>Add your wishes!</h1>
      {/* Add Wish form */}
      <form className="add-wish-form" onSubmit={addNewQuote}>
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
          max="500"
          onChange={sourceChangerHandler}
        />
        <input
          value={enteredLink}
          max="400"
          type="text"
          placeholder="Link"
          onChange={linkChangerHandler}
        />
        <button type="submit">Add new Wish!</button>
      </form>
    </div>
  );
};

export default AddWishRoute;
