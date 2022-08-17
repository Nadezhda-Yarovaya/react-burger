import React, { FC, useEffect, useState } from 'react';
import ordersStyles from './orders.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIngredients } from '../../../services/selectors';
import PersonalMenu from '../../../components/personal-menu/personal-menu';
import initialTempOrderList from '../../../utils/tempdata';
import OrdersList from '../../../components/orders-list/orders-list';
import { SET_POSITIONSDATA } from '../../../services/actions';
import {
  TIngredientUnique,
  TLocation,
  TOrderItem,
  TOrdersId,
} from '../../../utils/types';
import { useLocation } from 'react-router-dom';

const { container, orders, maintitle } = ordersStyles;

const Orders: FC = () => {
  const dispatch = useDispatch();

  const location = useLocation<TLocation>();

  const allIngredients = useSelector(getAllIngredients);
  const tempOrderslist: Array<TOrderItem> = initialTempOrderList;

  const orderPersonalList = useSelector(
    (state: any) => state.order.orderFullList
  );

  /*
  const orderList =
    location.pathname === '/feed' ? orderAllList : orderPersonalList;*/

  //console.log('orderList: ', orderList);
/*
  useEffect(() => {
    //const new1 = newListAfterFilter(new2);
    if (allIngredients) {
      dispatch({
        type: SET_POSITIONSDATA,
        payload: tempOrderslist,
      });
    }
  }, [allIngredients]);*/

  //const [orderList, setOrderList]

  /*
  type TList = {
    _id: string,
    name: string,
    image: string,
    price: number,
    type: string,
  }

  const newListAfterFilter = (arr1: Array<TOrderItem>) => {
    return arr1.map((item) => {
      const newPositions = item.positions.map((elementId) => {
        const newArrayItem = allIngredients.find(
          (ingredient: TOrderItem) => ingredient._id === elementId
        );

        if (newArrayItem) {
          return {
            _id: newArrayItem._id,
            name: newArrayItem.name,
            image: newArrayItem.image,
            price: newArrayItem.price,
            type: newArrayItem.type,
          };
        }

        return elementId;
      });

      /* console.log('map:', {
        ...item,
        positions: newPositions,
      }); 

      return {
        ...item,
        positions: newPositions,
      };
    });
  }
*/
  return (
    <>
      <div className={container}>
        <PersonalMenu />
        <OrdersList listType='profile' />
      </div>
    </>
  );
};

export default Orders;
