import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./services/reducers";
import { socketMiddleware } from "./services/middlewares/socketMiddleware";
import { getCookie } from './utils/auth';
import { feedWsActions } from './services/actions/socket-actions';

//const composeEnhancers = composeWithDevTools();
const wsUrl='wss://norma.nomoreparties.space/orders/';
const accessToken = getCookie('token');
console.log('token: ', accessToken);
const ourWsMiddleware = socketMiddleware(feedWsActions);
const ourWsMiddleware2 = socketMiddleware();
const enhancer = composeWithDevTools(applyMiddleware(thunk, ourWsMiddleware, ourWsMiddleware2));
const store = createStore(rootReducer, enhancer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
  <React.StrictMode>
    {" "}
   
      <Provider store={store}>   
        <App />   
      </Provider>{" "}
  </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
