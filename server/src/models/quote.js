import mongoose from "mongoose";

const quoteSchema = mongoose.Schema({
    quote: {
        type: String,
        required: true,
    },
    source: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [ {
        text: String, 
        author: String,
    }]
});

const Quote = mongoose.model("Quote", quoteSchema);
export default Quote;
