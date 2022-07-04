import {
  GET_ORDERDATA_SUCCESS,
  GET_ORDERDATA_REQUEST,
  GET_ORDERDATA_FAILURE,
  SET_TOTALSUM,
  CLEAR_ORDERDATA,
} from '../actions';

const initialState = {
  createdOrder: { number: 0, positions: [''] },
  isOrderLoading: false,
  isPerformed: false,
  totalSum: 0,
};

export function orderInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERDATA_REQUEST:
      return {
        ...state,
        isOrderLoading: false,
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
        isPerformed: true,
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

    default:
      return state;
  }
}
