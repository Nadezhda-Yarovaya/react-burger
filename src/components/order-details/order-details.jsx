import React from "react";
import orderDetailsStyles from "./order-details.module.css";

import doneSign from "../../images/done.svg";
import { useSelector } from "react-redux";

const { digits, window__text, window__extra } = orderDetailsStyles;

function OrderDetails() {
  const orderNumber = useSelector((store) => store.order.createdOrder.number);

  return (
    <>
      <p className={`text text_type_digits-large ${digits}`}>{orderNumber}</p>
      <p className={`text text_type_main-default mt-8 mb-15`}>
        Идентификатор заказа
      </p>
      <img src={doneSign} alt="заказ совершен" />
      <p className={`text text_type_main-default mt-15 mt-8 ${window__text}`}>
        Заказ начали готовить
      </p>
      <p className={`text text_type_main-default  ${window__extra}`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

export default OrderDetails;
