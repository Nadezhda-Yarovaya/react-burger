import { combineReducers } from "redux";

import { dndReducer } from "./dnd-reducer";
import { orderInfoReducer } from "./order-info-reducer";
import {mobileReducer } from './mobile-reducer';
import { ingredientsReducer } from "./ingredients-reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer, 
  order: orderInfoReducer,
  mobile: mobileReducer,
  dragAndDrop: dndReducer
});

