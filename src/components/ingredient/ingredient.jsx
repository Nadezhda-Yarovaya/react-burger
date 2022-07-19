import ingredientStyles from "./ingredient.module.css";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ifItsMobile } from "../../services/selectors";

import { ingredientType } from "../../utils/types";

import {
  SET_CURRENT,
  SET_MODALINGREDIENTS,
  REPLACE_BUN,
} from "../../services/actions";
import { dropElement } from "../../services/action-creators/dnd-action-creators";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Ingredient(props) {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const {
    price,
    item__name,
    counter,
    list__choice,
    item__mobilebutton,
    list__item,
  } = ingredientStyles;

  const { item } = props;

  const bunCount = useSelector((store) => {
    let totalCount = 0;
    if (store.ingredients.bun._id === item._id) {
      totalCount++;
    }
    return totalCount;
  });

  const ingredientCount = useSelector((store) => {
    let totalCount = 0;
    store.dragAndDrop.droppedElements.forEach((curItem) => {
      if (curItem._id === item._id) {
        totalCount++;
      }
    });
    return totalCount;
  });
  const isMobile = useSelector(ifItsMobile);

  const [, draggedIngredientRef] = useDrag({
    type: "ingredient",
    item: { item },
  });

  const [, draggedBun] = useDrag({
    type: "bun",
    item: { item },
  });

  const handleBunDrop = (currentItem) => {
    console.log("indrop mobile", currentItem._id);
    dispatch({
      type: REPLACE_BUN,
      bun: currentItem,
    });
  };

  const currentCounter = item.type === "bun" ? bunCount : ingredientCount;

  function openModalIngredient(currentItem) {
    dispatch({
      type: SET_CURRENT,
      currentIngredient: currentItem,
    });

    dispatch({
      type: SET_MODALINGREDIENTS,
    });
  }

  return (
    <li
      ref={
        isMobile
          ? null
          : item.type === "bun"
          ? draggedBun
          : draggedIngredientRef
      }
    >
      <div className={list__item}>
        <Link
          to={{ pathname: `/ingredients/${item._id}`, state: { from: "/" } }}
          onClick={() => {
            openModalIngredient(item);
          }}
          className={list__choice}
        >
          <img src={item.image} alt={item.name} />
          <div className={`mt-2 mb-2 ${price}`}>
            {" "}
            <p className="text text_type_digits-default mr-2">{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`text text_type_main-default ${item__name}`}>
            {item.name}
          </p>

          {currentCounter > 0 ? (
            <div className={`${counter}`}>
              <Counter count={currentCounter} size="default" />
            </div>
          ) : (
            <></>
          )}
        </Link>
        {isMobile ? (
          <Link
            className={item__mobilebutton}
            onClick={(e) => {
              e.preventDefault();
              if (item.type === "bun") {
                handleBunDrop(item);
              } else {
                dropElement(item, dispatch);
              }
            }}
          >
            Добавить
          </Link>
        ) : (
          <></>
        )}
      </div>
    </li>
  );
}

Ingredient.propTypes = {
  item: ingredientType.isRequired,
};

export default Ingredient;
