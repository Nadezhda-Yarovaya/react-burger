import React from 'react';
import PropTypes from 'prop-types';

import headerItemStyles from './header-item.module.css';

//import { IfMobileContext } from '../../services/app-contexts';
import { useSelector } from 'react-redux';

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const texts = ['Конструктор', 'Лента заказов', 'Личный кабинет'];
const icons = [BurgerIcon, ListIcon, ProfileIcon];
let Icon = icons[0];

function HeaderItem(props) {
  const isMobile = useSelector((store) => store.isMobile);

  texts.forEach((item, ind) => {
    if (item === props.text) {
      Icon = icons[ind];
    }
  });

  return (
    <>
      {isMobile ? (
        <></>
      ) : (
        <div className={`${headerItemStyles.icon} ml-1 mr-2`}>
          <Icon type={`${props.secondary ? 'secondary' : 'primary'}`} />
        </div>
      )}
      <p
        className={`mb-2 text text_type_main-default${
          props.secondary ? ' ' + headerItemStyles.menu__item_inactive : ''
        }`}
      >
        {props.text}
      </p>
    </>
  );
}

HeaderItem.propTypes = {
  text: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
};

export default HeaderItem;
