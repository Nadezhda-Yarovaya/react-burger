import React, { Dispatch } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, Action, EmptyObject } from "redux";
import { Provider } from "react-redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./services/reducers";
import { socketMiddleware } from "./services/middlewares/socketMiddleware";
import { getCookie } from './utils/auth';
import { feedWsActions } from './services/actions/feed-ws-actions';
import { AppThunk, TAppActions } from './utils/types';
import { ordersWsActions } from './services/actions/orders-ws-actions';
import { ingredientsState } from './services/reducers/ingredients-reducer';
import { TOrderState } from './services/reducers/order-info-reducer';
import { TMobileState } from './services/reducers/mobile-reducer';
import { TDndState } from './services/reducers/dnd-reducer';
import { TAuthType } from './services/reducers/auth-reducer';
import { TWSState } from './services/reducers/orders-socket-reducer';

//const composeEnhancers = composeWithDevTools();
const baseUrl='wss://norma.nomoreparties.space/orders';

const accessToken = getCookie('token');
console.log('token: ', accessToken);
const ourWsMiddleware = socketMiddleware(`${baseUrl}/all`, feedWsActions);
const ourWsMiddleware2 = socketMiddleware(`${baseUrl}?token=${accessToken}`, ordersWsActions);;
const enhancer = composeWithDevTools(applyMiddleware(thunk, ourWsMiddleware, ourWsMiddleware2));
const store = createStore(rootReducer, enhancer);

//export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

/*type AppThunk2 = ThunkAction<void, Action<any>, EmptyObject & {
  ingredients: ingredientsState;
  order: TOrderState;
  mobile: TMobileState;
  dragAndDrop: TDndState;
  auth: TAuthType;
  feedWs: TWSState;
  ordersWA: TWSState; }, TAppActions>;*/

  export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>;

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
