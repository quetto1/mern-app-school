import Quote from "./models/quote.js";
import express from "express";

const router = express.Router();

/* Define all routes */
// Endpoint for saving quotes
router.post("/", async (req, res) => {
  try {
    // Check if quote is too long
    if (req.body.quote.length > 500) {
      throw new Error("Quote longer than 500 characters");
    }
    // Create new quote
    const quote = new Quote(req.body);
    // Save it in the database
    const savedQuote = await quote.save();
    res.json(savedQuote);
  } catch (error) {
    res.json(error);
  }
});

// Endpoint for listing quotes
router.get("/", async (req, res) => {
  try {
    // Get a list of quotes
    const quotes = await Quote.find();
    console.log(quotes);
    res.json(quotes);
  } catch (error) {
    res.json(error);
  }
});

// Endpoint getting quote by id
router.get("/getQuoteById", async (req, res) => {
  try {
    // Get a single quote by id
    const _id = req.query.id;
    const quote = await Quote.find({ _id });
    res.json(quote);
  } catch (error) {
    res.json(error);
  }
});

// Endpoint for posting comments
router.post("/addComment", async (req, res) => {
  try {
    // Create new coment
    const comment = req.body.comment;
    const _id = req.body.quoteId;
    // Find the quote that I need to update
    const quote = await Quote.findOne({ _id });
    // Add the comment to the quote
    quote.comments.push(comment);
    // Save the quote in the database
    const savedQuote = await quote.save();
    res.json(savedQuote);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// Endpoint for adding a like to a quote
router.post("/addLike", async (req, res) => {
  try {
    const _id = req.body.quoteId;
    // Find the quote that I need to update
    const quote = await Quote.findOne({ _id });
    // Update likes
    quote.likes++;
    // Save the quote in the database
    const savedQuote = await quote.save();
    res.json(savedQuote);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

export default router;
