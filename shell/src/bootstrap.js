import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux'; 

import store from "./store";
import App from "./components/App";
import AuthProvider from './AuthProvider';
import "./index.css";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(
  <AuthProvider>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/:lang/:prov">
          <App />
        </Route>
        <Route path="/" exact>
          <Redirect to="/en/bc" />
        </Route>
      </Router>
    </Provider>
  </AuthProvider>,
  document.getElementById("root")
);
