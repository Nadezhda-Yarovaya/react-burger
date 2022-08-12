import React, { FunctionComponent, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import headerItemStyles from "./header-item.module.css";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type THeaderItemProps = {
  text: string;
  sub?: boolean;
  id?: number;
  icon?: any; // temporary setting any
}

const HeaderItem: FunctionComponent<THeaderItemProps> = ({ text, sub, id, icon}) : JSX.Element => {
  const [menuItems, setmenuItems] = useState([
    { path: "/", id: 1, type: "" },
    { path: "/feed", id: 2, type: "" },
    { path: "/profile", id: 3, type: "" },
  ]);

  const location = useLocation();

  const indexToShow: number = id ? id - 1 : 0;
  const Icon = icon ? icon : BurgerIcon;
  const text2 = text ? text : "";

  const currentPath = location.pathname;

  function filterType() {
    return menuItems.filter((item) => {
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
    setmenuItems(newItems);
  }, [location.pathname]);

  return (
    <>
      {" "}
      {sub ? (
        <></>
      ) : (
        <div className={`${headerItemStyles.icon} ml-1 mr-2`}>
          <Icon type={menuItems[indexToShow].type} />
        </div>
      )}
      <p className={`mb-2 text text_type_main-default`}>{text2}</p>
    </>
  );
}

/*HeaderItem.propTypes = {
  text: PropTypes.string.isRequired,
  sub: PropTypes.bool,
  id: PropTypes.number,
};*/

export default HeaderItem;
