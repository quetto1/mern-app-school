import { useEffect, useState } from "react";
import { getQuotesFromApi} from "./services/taskServices.js";
import { Link } from "react-router-dom";
import "./FrontPage.css";


function App() {
  const [quotes, setQuotes] = useState([]);

  
  // responsible for fetching the data on the page load
  useEffect(() => {
    console.log("test")
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
          <div className="wish-date">Date:14-12-2021</div> 
        </div>
      </div>
      </div>
    );
  }


  // TODO: Make it look like https://material.io/components/cards
  return (
    <div className="front-page-wrapper">
      <h1>Wish List!</h1>
      <h2>Description...</h2>    
      {/*displayed wishes */}
      <ul>{items}</ul>
    </div>
  );
}

export default App;
