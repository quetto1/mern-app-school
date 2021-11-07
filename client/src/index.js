import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import QuoteRoute from "./QuoteRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Router handles switching out and displaying different views in the APP

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/:id">
          <QuoteRoute />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
