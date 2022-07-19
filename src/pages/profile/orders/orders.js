import React, { useEffect } from "react";
import ordersStyles from "./orders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllIngredients } from "../../../services/selectors";
import PersonalMenu from "../../../components/personal-menu/personal-menu";
import initialTempOrderList from "../../../utils/tempdata";
import Order from "../../../components/order/order";
import { SET_POSITIONSDATA } from "../../../services/actions";

const {
  container,
  orders,
  maintitle,
} = ordersStyles;

function Orders(props) {
  const dispatch = useDispatch();

  const allIngredients = useSelector(getAllIngredients);

  useEffect(() => {
    const new1 = newListAfterFilter(initialTempOrderList);

    if (allIngredients) {
      dispatch({
        type: SET_POSITIONSDATA,

        payload: new1,
      });
    }
  }, [allIngredients]);

  const orderList = useSelector((state) => state.order.orderFullList);

  function newListAfterFilter(arr1) {
    return arr1.map((item) => {
      const newPositions = item.positions.map((elementId) => {
        const newArrayItem = allIngredients.find(
          (ingredient) => ingredient._id === elementId
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

        return { _id: elementId, name: "", image: "", price: 0 };
      });

      /* console.log('map:', {
        ...item,
        positions: newPositions,
      }); */

      return {
        ...item,
        positions: newPositions,
      };
    });
  }

  return (
    <>
      <div className={container}>
        <PersonalMenu />
        <div className={`${orders} pr-2`}>
          <p className={maintitle}>История заказов</p>

          {orderList.map((item, ind) => (
            <Order key={ind} item={item} />
          ))}
        </div>{" "}
      </div>
    </>
  );
}

export default Orders;
