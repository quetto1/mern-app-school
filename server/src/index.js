
import createServer from "./server.js";
import mongoose from "mongoose";

const appName = "Server API";
const port = process.env.PORT || 8080;
const server = createServer();

// Connecting to the database
mongoose.connect("mongodb+srv://cluster01.dp5pp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    dbName: 'myFirstDatabase',
    user: 'keto',
    pass: 'keto',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('db connected') 
})


// this attaches the server to the port 
server.listen(port, () => console.log(`${appName} running on port ${port}!`));
