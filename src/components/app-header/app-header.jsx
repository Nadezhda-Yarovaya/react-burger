import React from 'react';

import {
  Logo,
  MenuIcon,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderItem from '../header-item/header-item';

import headerStyles from './app-header.module.css';

import logoMobile from '../../images/logomobile.svg';

import openSubmIcon from '../../images/openSubmenu.svg';
import closeSubmIcon from '../../images/closeSubmenu.svg';
import { useDispatch, useSelector } from 'react-redux';

import {
  OPEN_MOBILEMENU,
  CLOSE_MOBILEMENU,
  UNFOLD_SUBMOBILEMENU,
  FOLD_SUBMOBILEMENU,
} from '../../services/actions';

const {
  header,
  header__container,
  menu,
  menu__item,
  logo,
  header__desktop,
  menu__image,
  mobilemenu,
  submenu,
  submenu_state_opened,
  submenu__item,
  mobilemenu__top,
  mobilemenu_state_opened,
  mobilemenu__list,
  header__mobile,
  header__mobilebutton,
} = headerStyles;

function AppHeader() {
  const dispatch = useDispatch();
  const isMobileMenuOpened = useSelector(
    (store) => store.mobile.isMobileMenuOpened
  );
  const isSubMenuOpened = useSelector((store) => store.mobile.isSubMenuOpened);

  function openMobileMenu() {
    dispatch({
      type: OPEN_MOBILEMENU,
    });
  }

  function closeMobileMenu() {
    dispatch({
      type: CLOSE_MOBILEMENU,
    });
  }

  function toggleSubMenu() {
    if (isSubMenuOpened) {
      dispatch({
        type: FOLD_SUBMOBILEMENU,
      });
    } else
      dispatch({
        type: UNFOLD_SUBMOBILEMENU,
      });
  }

  return (
    <header className={header}>
      <div className={`pt-4 pb-2 ${header__container}`}>
        <div className={header__desktop}>
          <nav className={menu}>
            <a href='#' className={`mr-6 ${menu__item}`}>
              <HeaderItem text='Конструктор' />
            </a>
            <a href='#' className={`ml-5 ${menu__item}`}>
              {' '}
              <HeaderItem text='Лента заказов' secondary={true} />
            </a>
          </nav>
          <div className={logo}>
            <a href='#'>
              <Logo />
            </a>
          </div>
          <a href='#' className={`${menu__item}`}>
            {' '}
            <HeaderItem text='Личный кабинет' secondary={true} />{' '}
          </a>
        </div>

        <div className={header__mobile}>
          <img src={logoMobile} alt='логотип мобильная версия' />
          <button className={header__mobilebutton} onClick={openMobileMenu}>
            <MenuIcon type='primary' />
          </button>
        </div>
      </div>

      <div
        className={`pl-2 pr-2 pt-4 pb-4 ${mobilemenu} ${
          isMobileMenuOpened ? ' ' + mobilemenu_state_opened : ''
        }`}
      >
        <div className={`pb-4 ${mobilemenu__top}`}>
          <p className='text text_type_main-medium'>Меню</p>
          <button className={header__mobilebutton} onClick={closeMobileMenu}>
            <CloseIcon type='primary' />
          </button>
        </div>
        <div className={mobilemenu__list}>
          <button className={`${menu__item}`} onClick={toggleSubMenu}>
            <HeaderItem text='Личный кабинет' />
            <img
              src={isSubMenuOpened ? closeSubmIcon : openSubmIcon}
              className={menu__image}
              alt='кнопка открытия личного кабинета'
            />
          </button>
          <div
            className={`pl-10 ${submenu}  ${
              isSubMenuOpened ? submenu_state_opened : ''
            }`}
          >
            <a href='#' className={`${menu__item} ${submenu__item}`}>
              {' '}
              <HeaderItem text='Профиль' />
            </a>
            <a href='#' className={`${menu__item} ${submenu__item}`}>
              {' '}
              <HeaderItem text='История заказов' />
            </a>
            <a href='#' className={`${menu__item} ${submenu__item}`}>
              {' '}
              <HeaderItem text='Выход' />
            </a>
          </div>
          <a href='#' className={`pt-3 pb-3 pl-0 ${menu__item}`}>
            {' '}
            <HeaderItem text={'Конструктор'} />
          </a>
          <a href='#' className={`pt-3 pb-3 ${menu__item}`}>
            {' '}
            <HeaderItem text='Лента заказов' />
          </a>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
