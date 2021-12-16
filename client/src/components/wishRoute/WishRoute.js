import { useParams } from "react-router-dom";
import { getQuoteById, addComment } from "../../services/taskServices.js";
import { useEffect, useState } from "react";
import "./WishRoute.css";

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
        <div className="comment-wrapper" key={value._id}>
          <div className="comment">
            <b>COMMENT:</b> {value.text}
          </div>
          <div>
            {" "}
            <b>Author:</b> {value.author}{" "}
          </div>
          <div>
            <b>Creation date:</b> {value.date.split("T")[0]} <b>Time:</b>{" "}
            {value.date.split("T")[1]}
          </div>
        </div>
      );
    }

    setQuote(newQuote);
    setCommentList(commentDisplayList.reverse());
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

  // const sendLikeQuoteReq = async () => {
  //   await addLike(id);
  //   // Refetches the Quote with the updated likes
  //   getQuote();
  // };

  return (
    <div className="wish-route-wrapper">
      <h2>Wish</h2>
      <div className="wish-wrapper">
        <div className="wish-title">Wish:{quote.quote}</div>
        <div className="wish-link">
          Link: <a href={quote.link}>{quote.link}</a>
        </div>
        <div className="wish-description">Description: {quote.source}</div>
        <div className="wish-footer">
          <div className="wish-comment-count">
            Comments: {commentList.length}
          </div>
          <div className="wish-date"> Creation date: {quote.date}</div>
        </div>
      </div>

      {/* Lajki Area here do wyjebania*/}
      {/* Likes: {quote.likes}
      <button onClick={sendLikeQuoteReq}>Like</button> */}
      <h2>Here you can comment this wish!</h2>

      <form className="comment-form" onSubmit={postNewComment}>
        <input
          value={comment}
          type="text"
          placeholder="Your comment..."
          onChange={commentInputHandler}
          required
        />
        <div className="second-row-wrapper">
          <input
            value={author}
            type="text"
            placeholder="Author"
            onChange={commentAuthorInputHandler}
            required
          />
          <button type="submit">Add comment</button>
        </div>
      </form>
      <h2>Comments!</h2>
      {commentList}
    </div>
  );
}

export default WishRoute;
