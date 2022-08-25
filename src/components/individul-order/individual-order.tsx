import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "../../hooks/hooks";
import { TLocation, TOrderWithIngredients } from "../../utils/types";
import { firstorder, initialElement } from "../../utils/utils";
import DateOrder from "../date/date";
import OrdersDataWrapper from "../orders-data-wrapper/orders-data-wrapper";
import ordersIdStyles from "./individual-order.module.css";

const {
  container,
  box,
  number,
  status,
  list,
  price,
  list__item,
  list__iteminfo,
  list__priceinfo,
  status_performed,
  footer,
  date,
  list__image,
  list__item2,
  list__priceinfototal
} = ordersIdStyles;

const IndividualOrder: FC = () => {
  const location = useLocation<TLocation>();
  // console.log("locat state: ", location.state);

  const [statusText, setStatusText] = useState<string>("");
  const [givenOrder, setGivenOrder] =
    useState<TOrderWithIngredients>(firstorder);

  function makeStatus(status: string) {
    switch (status) {
      case "done":
        return "Выполнен";
      case "created":
        return "Выполнен";
      case "pending":
        return "Создан";
      default:
        return "Выполнен";
    }
  }

  useEffect(() => {
    setStatusText(makeStatus(givenOrder.status));
  }, [givenOrder]);

  type TParams = {
    id: string;
  };

  const { id } = useParams<TParams>();
  const isFeed = location.pathname.includes("/feed");
  const isOrders = location.pathname.includes("/orders");

  const orderAllList = useSelector((state) => state.feedWs.ordersArray);
  const orderPersonlList = useSelector((state) => state.ordersWs.ordersArray);

  let orderList: TOrderWithIngredients[] | undefined = useMemo(() => {
    return [initialElement];
  }, []);

  if (isFeed) {
    orderList = orderAllList;
  }
  if (isOrders) {
    orderList = orderPersonlList;
  }

  useEffect(() => {
    if (orderList) {
      const current = orderList.find((item) => item._id === id);
      if (current) {
        setGivenOrder(current);
      }
    }
  }, [id, orderList]);

  const [totalSumOrder, setTotalSumOrder] = useState<number>(0);

  //qty unknown надо решить

  useEffect(() => {
    if (givenOrder) {
      let sumArray: number[] = [];
      sumArray = givenOrder.ingredients.map((item) => (item?.price * item?.qty) || 0);

      const orderTotal =
      sumArray.reduce((prev, current) => prev + current, 0) || 0;
      setTotalSumOrder(orderTotal);
    }
  }, [givenOrder]);
  
  return (
    <OrdersDataWrapper>
      <div className={container}>
        <div className={box}>
          <p className={`${number} text text_type_digits-default mb-10`}>
            #{givenOrder.number}
          </p>
          <p className="text text_type_main-medium mb-3">{givenOrder.name}</p>
          <p
            className={`${status} ${status_performed} text text_type_main-default`}
          >
            {statusText}
          </p>
          <p className="text text_type_main-medium mb-6">Состав :</p>
          <ul className={list}>
            {givenOrder.ingredients[0] &&
              givenOrder.ingredients.map((element) => (
                <li key={element!._id} className={list__item}>
                  <div className={list__iteminfo}>
                    <div className={list__item2}>
                      <div
                        className={list__image}
                        style={{ backgroundImage: `url('${element!.image}')` }}
                      ></div>
                    </div>
                    <p>{element!.name}</p>
                  </div>
                  <div className={list__priceinfo}>
                    <p className={`${price} text text_type_digits-default`}>
                      {`${element!.qty} x ${element!.price}`}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              ))}
          </ul>
          <div className={footer}>
            <DateOrder item={givenOrder} />
            <div className={list__priceinfototal}>
              <p className={`${price} text text_type_digits-default`}>
                {totalSumOrder}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </OrdersDataWrapper>
  );
};

export default IndividualOrder;
