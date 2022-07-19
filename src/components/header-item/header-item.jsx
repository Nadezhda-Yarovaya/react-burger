import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import headerItemStyles from "./header-item.module.css";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function HeaderItem(props) {
  const [menuItems1, setMenuItems1] = useState([
    { path: "/", id: 1, type: "" },
    { path: "/feed", id: 2, type: "" }, // лента заказов тут, а не личные заказы
    { path: "/profile", id: 3, type: "" },
  ]);

  const location = useLocation();

  const indexToShow = props.id ? props.id - 1 : 0;
  const Icon = props.icon ? props.icon : BurgerIcon;
  const text2 = props.text ? props.text : "";

  const currentPath = location.pathname;

  function filterType() {
    return menuItems1.filter((item) => {
      if (
        currentPath === item.path ||
        (currentPath === "/profile/orders" && item.path === "/profile")
      ) {
        item.type = "primary";
      } else {
        item.type = "secondary";
      }
      return item;
    });
  }

  useEffect(() => {
    const newItems = filterType();
    setMenuItems1(newItems);
  }, [location.pathname]);

  return (
    <>
      {" "}
      {props.sub ? (
        <></>
      ) : (
        <div className={`${headerItemStyles.icon} ml-1 mr-2`}>
          <Icon type={menuItems1[indexToShow].type} />
        </div>
      )}
      <p className={`mb-2 text text_type_main-default`}>{text2}</p>
    </>
  );
}

HeaderItem.propTypes = {
  text: PropTypes.string.isRequired,
  sub: PropTypes.bool,
  id: PropTypes.number,
};

export default HeaderItem;
