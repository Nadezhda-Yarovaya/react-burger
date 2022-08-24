import { combineReducers } from 'redux';
import { dndReducer } from './dnd-reducer';
import { orderInfoReducer } from './order-info-reducer';
import { mobileReducer } from './mobile-reducer';
import { ingredientsReducer } from './ingredients-reducer';
import { authReducer } from './auth-reducer';
import { feedWsReducer } from './feed-socket-reducer';
import { ordersWsReducer } from './orders-socket-reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderInfoReducer,
  mobile: mobileReducer,
  dragAndDrop: dndReducer,
  auth: authReducer,
  feedWs: feedWsReducer,
  ordersWs: ordersWsReducer,
});
