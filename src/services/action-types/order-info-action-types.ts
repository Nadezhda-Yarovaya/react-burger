import {
  GET_ORDERDATA_SUCCESS,
  GET_ORDERDATA_REQUEST,
  GET_ORDERDATA_FAILURE,
  SET_TOTALSUM,
  CLEAR_ORDERDATA,
  SET_POSITIONSDATA,
} from '../actions';

type TCreatedOrder =  {
  number: number;
  positions: Array<string>;
};  

export interface IGetOrderdataRequest {
  readonly type: typeof GET_ORDERDATA_REQUEST;
  readonly isOrderLoading: boolean;
}

export interface IGetOrderdataSuccess {
  readonly type: typeof GET_ORDERDATA_SUCCESS;
  readonly createdOrder:TCreatedOrder;
}

export interface IClearData {
  readonly type: typeof CLEAR_ORDERDATA;
  readonly isPerformed: boolean;
  readonly createdOrder: TCreatedOrder;
}


export interface IGetOrderdataFailure {
  readonly type: typeof GET_ORDERDATA_FAILURE;
  readonly isOrderLoading: boolean;
}

export interface ISetTotalSum {
  readonly type: typeof SET_TOTALSUM;
  readonly totalSum: {totalSum: number;}
}

export interface ISetPositions {
  readonly type: typeof SET_POSITIONSDATA;
  readonly payload: {orderFullList: Array<string>;}
}



export type TOrderInfoActions = IGetOrderdataRequest | IGetOrderdataSuccess | IClearData | IGetOrderdataFailure | ISetTotalSum | ISetPositions;
