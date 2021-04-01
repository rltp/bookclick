import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import { Provider } from "react-redux";
import decode from "jwt-decode";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import "semantic-ui-css/semantic.min.css";
import { userLoggedIn } from "./actions/auth";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.JWT) {
  const payload = decode(localStorage.JWT);
  const user = {
    token: localStorage.JWT,
    email: payload.email,
    confirmed: payload.confirmed,
    firstname: payload.firstname,
  };
  setAuthorizationHeader(localStorage.JWT);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);
registerServiceWorker();
