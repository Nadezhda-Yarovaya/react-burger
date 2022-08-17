import React, { useState, useEffect, FC } from "react";
import ordersIdStyles from "./orders-id.module.css";
import initialTempOrderList from "../../../utils/tempdata";
import { useParams } from "react-router-dom"; // импортируем хук
import { useSelector } from "react-redux";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientUnique, TOrderItem, TOrdersId } from '../../../utils/types';

const {
  container,
  box,
  number,
  name,
  status,
  title,
  list,
  price,
  list__item,
  list__iteminfo,
  list__priceinfo,
} = ordersIdStyles;


const OrdersId: FC = () => {
  type TElement = {
    image: string;
    name: string;
    price: number;
  };
  const tempList: Array<TOrderItem> = initialTempOrderList;


  const [currentOrderShown, setCurrentOrderShown] = useState<TOrderItem>(
    tempList[0]
  );

  const [currentPositions, setCurrentPositions] = useState<Array<TElement>>([]);
  type TParams = {
    id: string;
  }

  const { id } = useParams<TParams>();

  // console.log('params id: ', id);

  
  const allIngredients = useSelector((state: any) => state.ingredients.listOfIngredients);
  const orderList = useSelector((state: any) => state.order.orderFullList);
  console.log('orderList: ', orderList);

  useEffect(() => {
    //console.log(orderList);
    const current = orderList.find((item: TOrderItem) => item._id === id);
    if (current) {
      setCurrentOrderShown(current);
    }
  }, [id]);

  /*
  useEffect(() => {    
    const newList = makeAllPositionsList(currentOrderShown.positions);
    setCurrentPositions(newList);
  }, [id, allIngredients]);*/

  // console.log(currentOrderShown);
  console.log('cur posi-s', currentPositions);

  return (
    <>
      <div className={container}>
        <div className={box}>
          <p className={number}>#{currentOrderShown.order.number}</p>
          <p className={name}>{currentOrderShown.name}</p>
          <p className={`${status}`}>{currentOrderShown.status}</p>
          <p className={title}>Состав :</p>
          <ul className={list}>

            {currentPositions[0] && (currentPositions.map((element, ind) => (
              <li key={ind} className={list__item}>
                <div className={list__iteminfo}>
                  <img src={element.image} alt={element.name}/>
                  <p>{element.name}</p>
                </div>
                <div className={list__priceinfo}>
                  <p className={price}>1 x {element.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            )))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default OrdersId;
