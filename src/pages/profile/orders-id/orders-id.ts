import React, { useState, useEffect } from "react";
import ordersIdStyles from "./orders-id.module.css";
import initialTempOrderList from "../../../utils/tempdata";
import { useParams } from "react-router-dom"; // импортируем хук
import { useSelector } from "react-redux";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

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

function OrdersId() {
  const [currentOrderShown, setCurrentOrderShown] = useState(
    initialTempOrderList[0]
  );

  const { id } = useParams();

  const orderList = useSelector((state) => state.order.orderFullList);

  useEffect(() => {
    const current = orderList.find((item) => item._id === id);
    if (current) {
      setCurrentOrderShown(current);
    }
  }, [id]);

  console.log(currentOrderShown);

  return (
    <>
      <div className={container}>
        <div className={box}>
          <p className={number}>#{currentOrderShown.order.number}</p>
          <p className={name}>{currentOrderShown.name}</p>
          <p className={`${status}`}>{currentOrderShown.status}</p>
          <p className={title}>Состав :</p>
          <ul className={list}>
            {currentOrderShown.positions.map((element, ind) => (
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
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default OrdersId;
