const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';

const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

const WS_SET_ORDERSLIST: 'WS_SET_ORDERSLIST' = 'WS_SET_ORDERSLIST';

export {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_GET_ORDERS,
  WS_SET_ORDERSLIST,
};

export const feedWsActions = {
  wsConnect: WS_CONNECTION_START,
  onSuccess: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,

  onClose: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_MESSAGE,
  onGetOrders: WS_GET_ORDERS,

  // onSetOrdersList: WS_SET_ORDERSLIST
};
