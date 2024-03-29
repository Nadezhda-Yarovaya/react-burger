const WS_CONNECTION_ORD_START: 'WS_CONNECTION_ORD_START' =
  'WS_CONNECTION_ORD_START';
const WS_CONNECTION_ORD_SUCCESS: 'WS_CONNECTION_ORD_SUCCESS' =
  'WS_CONNECTION_ORD_SUCCESS';
const WS_CONNECTION_ORD_ERROR: 'WS_CONNECTION_ORD_ERROR' =
  'WS_CONNECTION_ORD_ERROR';

const WS_CONNECTION_ORD_CLOSED: 'WS_CONNECTION_ORD_CLOSED' =
  'WS_CONNECTION_ORD_CLOSED';
const WS_GET_ORD_MESSAGE: 'WS_GET_ORD_MESSAGE' = 'WS_GET_ORD_MESSAGE';

const WS_GET_ORD_ORDERS: 'WS_GET_ORD_ORDERS' = 'WS_GET_ORD_ORDERS';

const WS_SET_ORD_ORDERSLIST: 'WS_SET_ORD_ORDERSLIST' = 'WS_SET_ORD_ORDERSLIST';

export {
  WS_CONNECTION_ORD_START,
  WS_CONNECTION_ORD_SUCCESS,
  WS_CONNECTION_ORD_ERROR,
  WS_CONNECTION_ORD_CLOSED,
  WS_GET_ORD_MESSAGE,
  WS_GET_ORD_ORDERS,
  WS_SET_ORD_ORDERSLIST,
};

export const ordersWsActions = {
  wsConnect: WS_CONNECTION_ORD_START,
  onSuccess: WS_CONNECTION_ORD_SUCCESS,
  onError: WS_CONNECTION_ORD_ERROR,
  onClose: WS_CONNECTION_ORD_CLOSED,
  onMessage: WS_GET_ORD_MESSAGE,
  onGetOrders: WS_GET_ORD_ORDERS,
};
