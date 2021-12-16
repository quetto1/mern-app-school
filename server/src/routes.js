import Quote from "./models/quote.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

const users = [
  // These are just some test users with passwords.
  // The passwords are in clear text for testing purposes (don't do this in production).
  { id: 0, username: "123", password: '123' },
  { id: 1, username: "tosk", password: 'password' },
  { id: 2, username: "mvkh", password: 'l33th0xor' },
]; 

export default function createRouter(secret) {
// We run through all users and hash their password. 
// Ideally, this should happen only in POST /api/users/ when signing up a new user,
// or in PUT /api/users/ when changing the password.
users.forEach(async user => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) reject(err); else resolve(hash);
    });
  });

  user.hash = hashedPassword; // Storing the hash+salt on the user object.
  delete user.password; // Let's remove the clear text password as well
  console.log(`Hash generated for ${user.username}:`, user); // Logging for debugging purposes
});

/* Define all routes */
// Endpoint for saving quotes
router.post("/", async (req, res) => {
  console.log(req);
  try {
   console.log("XDDD");
    // Check if quote is too long
    if (req.body.quote.length > 500) {
      throw new Error("Quote longer than 500 characters");
    }
    // Create new quote
    console.log(req.body);
    const quote = new Quote(req.body.quote);
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

 // This route takes a username and a password and creates an auth token
  // POST /api/users/authenticate
  router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);

    if (!username || !password) {
      let message = "Username or password missing!";
      console.error(message);
      res.status(401).json({ message: message });
      return;
    }

    const user = users.find((user) => user.username === username);
    if (user) { // If the user is found
      if (bcrypt.compareSync(password, user.hash)) {
        const payload = { username: username };
        const token = jwt.sign(payload, secret, { algorithm: 'HS512', expiresIn: '1h' });

        res.json({
          message: `User '${username}' authenticated successfully`,
          token: token
        });
      } else {
        res.status(401).json({ message: "Password mismatch!" })
      }
    } else {
    console.log("CHUJ");

      res.status(404).json({ message: "User not found!"});
    }
  });
  return router;
}




// // Endpoint for adding a like to a quote
// router.post("/addLike", async (req, res) => {
//   try {
//     const _id = req.body.quoteId;
//     // Find the quote that I need to update
//     const quote = await Quote.findOne({ _id });
//     // Update likes
//     quote.likes++;
//     // Save the quote in the database
//     const savedQuote = await quote.save();
//     res.json(savedQuote);
//   } catch (error) {
//     console.log(error);
//     res.json(error);
//   }
// });


