/* This service uses axios to make HTTP requests to our express.js server   */
import axios from "axios";
const apiUrl = "/api/";

// Gets a list of Quotes from the database
export async function getQuotesFromApi() {
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
export async function getQuoteById(id) {
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
export function addQuotes(quote) {
  try {
    return axios.post(apiUrl, quote);
  } catch (e) {
    console.error(e);
  }
}

// Add a comment to a Quote
export function addComment(quoteId, comment) {
  try {
    return axios.post(apiUrl + "/addComment", quoteId, comment);
  } catch (e) {
    console.error(e);
  }
}

// Add a like to a Quote
export function addLike(quoteId) {
  try {
    return axios.post(apiUrl + "/addLike", { quoteId: quoteId });
  } catch (e) {
    console.error(e);
  }
}

// // Delete an existing Quote
// export function deleteQoute(quoteId) {
//   try {
//     return axios.delete(apiUrl, quoteId);
//   } catch (e) {
//     console.error(e);
//   }
// }
