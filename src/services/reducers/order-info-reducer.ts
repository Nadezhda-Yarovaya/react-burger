import { firstorder, TOrderFromServer, TOrderFull, TOrderFull1 } from '../../utils/types';
import { TOrderInfoActions } from '../action-types/order-info-action-types';
import {
  GET_ORDERDATA_SUCCESS,
  GET_ORDERDATA_REQUEST,
  GET_ORDERDATA_FAILURE,
  SET_TOTALSUM,
  CLEAR_ORDERDATA,
  SET_POSITIONSDATA
} from '../actions';

export type TOrderState = {
  createdOrder: {number?: number; positions?: Array<string>},
  isOrderLoading: boolean;
  isPerformed: boolean;
  totalSum: number;
  orderFullList: Array<TOrderFull1>;
};



const initialState = {
  createdOrder: { number: 0, positions: ['sdf', 'ss'] },
  isOrderLoading: false,
  isPerformed: false,
  totalSum: 0,
  orderFullList: [firstorder]
};

export function orderInfoReducer(state: TOrderState = initialState, action : TOrderInfoActions) : TOrderState {
  switch (action.type) {
    case GET_ORDERDATA_REQUEST:
      return {
        ...state,
        isOrderLoading: true,
        isPerformed: true,
      };
    case GET_ORDERDATA_SUCCESS:
      return {
        ...state,
        createdOrder: {
          ...state.createdOrder,
          number: action.createdOrder.number,
          positions: action.createdOrder.positions,
        },
        isOrderLoading: false,        
      };
    case CLEAR_ORDERDATA:
      return {
        ...state,
        isPerformed: false,
        createdOrder: initialState.createdOrder,
      };
    case GET_ORDERDATA_FAILURE:
      return {
        ...state,
        isOrderLoading: false,
      };
    case SET_TOTALSUM:
      return {
        ...state,
        totalSum: action.totalSum,
      };

      case SET_POSITIONSDATA: 
      return {
        ...state,
        orderFullList: action.payload
      };
    default:
      return state;
  }
}
