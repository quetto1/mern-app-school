/* This service uses axios to make HTTP requests to our express.js server   */
import axios from "axios";
const apiUrl = "/api/";
//  for local tests "http://localhost:CLIENTPORT/api/" 8080, heroku /api/

// Gets a list of Quotes from the database
 const getQuotesFromApi = async () => {
  try {
    const res = await axios.get(apiUrl);
    const quotes = res.data;
    return quotes;
  } catch (e) {
    console.error(e);
    return [];
  }
}

// Get a specific Quote based on an id
const getQuoteById = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}/getQuoteById`, { params: { id } });
    const quote = res.data[0];
    return quote;
  } catch (e) {
    console.error(e);
    return [];
  }
}

// Add a new Quote to the database
const addQuotes = (quote) => {
  try {
    const token = getCookie().token 
    console.log(token);
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  }; 
  const bodyParameters = {
    quote: quote
 }; 
  console.log(token);
    return axios.post(apiUrl, bodyParameters, config);
  } catch (e) {
    console.error(e);
  }
}

// Add a comment to a Quote
const addComment = (quoteId, comment) => {
  try {
    return axios.post(apiUrl + "addComment", quoteId, comment);
  } catch (e) {
    console.error(e);
  }
}

const getCookie = () => {
 return document.cookie.split('; ').reduce((prev, current) => {
    const [name, ...value] = current.split('=');
    prev[name] = value.join('=');
    return prev;
  }, {});
}

const authenticateUser = (username, password) => {
  try {
    return axios.post(apiUrl + "authenticate", { username: username, password:password });
  } catch (e) {
    console.log(e.response);
  }
}

// CHANGE THIS LATER TO DO:
// Add a like to a Quote
const addLike = (quoteId) => {
  try {
    return axios.post(apiUrl + "/addLike", { quoteId: quoteId });
  } catch (e) {
    console.error(e);
  }
}

// // Delete an existing Quote
// const deleteQoute = (quoteId) => {
//   try {
//     return axios.delete(apiUrl, quoteId);
//   } catch (e) {
//     console.error(e);
//   }
// }

export {getQuotesFromApi, getQuoteById, addQuotes, addComment, getCookie, authenticateUser, addLike} 
