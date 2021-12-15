import { useParams } from "react-router-dom";
import { getQuoteById, addComment, addLike } from "../../services/taskServices.js";
import { useEffect, useState } from "react";

function WishRoute() {
  // Get the quote ID from the url
  const { id } = useParams();

  const [quote, setQuote] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getQuote();
  }, []);

  // Used in useEffect to fetch the Quote from the API and initialize some variables
  async function getQuote() {
    // Fetch the quote from the API based on ID
    const newQuote = await getQuoteById(id);
    console.log(newQuote);
    // Initialize the commentDisplayList which is used in the JSX
    const commentDisplayList = [];
    for (const value of newQuote.comments) {
      commentDisplayList.push(
        <li key={value._id}>
          COMMENT: {value.text} BY: {value.author}{" "}
        </li>
      );
    }

    setQuote(newQuote);
    setCommentList(commentDisplayList);
  }

  // Listens to the input and updates the comment state
  const commentInputHandler = (event) => {
    setComment(event.target.value);
  };

  // Listens to the input and updates the author state
  const commentAuthorInputHandler = (event) => {
    setAuthor(event.target.value);
  };

  // Handels the submit from function, takes the addQuote function and then saves is in prepered schema
  const postNewComment = async (e) => {
    e.preventDefault();
    await addComment({
      quoteId: id,
      comment: { text: comment, author: author },
    });

    // Refetches the Quote with the new comment
    getQuote();
    setAuthor("");
    setComment("");
  };

  const sendLikeQuoteReq = async () => {
    await addLike(id);
    // Refetches the Quote with the updated likes
    getQuote();
  };

  // TODO: Make this look nice
  return (
    <div>
      <h2>QUOTE</h2>
      {quote.quote} <br />
      {quote.source} <br />
      Likes: {quote.likes}
      <button onClick={sendLikeQuoteReq}>Like</button>
      <form onSubmit={postNewComment}>
        <input
          value={comment}
          type="text"
          placeholder="Your comment..."
          onChange={commentInputHandler}
          required
        />
        <input
          value={author}
          type="text"
          placeholder="Author"
          onChange={commentAuthorInputHandler}
          required
        />
        <button type="submit">Add new Quote</button>
      </form>
      <ul>{commentList}</ul>
    </div>
  );
}

export default WishRoute;
