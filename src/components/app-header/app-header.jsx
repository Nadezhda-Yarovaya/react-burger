import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
  MenuIcon,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderItem from '../header-item/header-item';

import headerStyles from './app-header.module.css';

import logoMobile from '../../images/logomobile.svg';
import { useState } from 'react';

import openSubmIcon from '../../images/openSubmenu.svg';
import closeSubmIcon from '../../images/closeSubmenu.svg';

import PropTypes from 'prop-types';

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

function AppHeader(props) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [isSubMenuOpened, setIsSubMenuOpened] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  function toggleSubMenu() {
    setIsSubMenuOpened(!isSubMenuOpened);
  }

  return (
    <header className={header}>
      <div className={`pt-4 pb-2 ${header__container}`}>
        <div className={header__desktop}>
          <nav className={menu}>
            <a href='#' className={`mr-6 ${menu__item}`}>
              <HeaderItem icon={BurgerIcon} text='Конструктор' />
            </a>
            <a href='#' className={`ml-5 ${menu__item}`}>
              {' '}
              <HeaderItem
                icon={ListIcon}
                text='Лента заказов'
                secondary={true}
              />
            </a>
          </nav>
          <div className={logo}>
            <a href='#'>
              <Logo />
            </a>
          </div>
          <a href='#' className={`${menu__item}`}>
            {' '}
            <HeaderItem
              icon={ProfileIcon}
              text='Личный кабинет'
              secondary={true}
            />{' '}
          </a>
        </div>

        <div className={header__mobile}>
          <img src={logoMobile} alt='логотип мобильная версия' />
          <button className={header__mobilebutton} onClick={toggleMobileMenu}>
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
          <button className={header__mobilebutton} onClick={toggleMobileMenu}>
            <CloseIcon type='primary' />
          </button>
        </div>
        <div className={mobilemenu__list}>
          <button className={`${menu__item}`} onClick={toggleSubMenu}>
            <HeaderItem
              icon={ProfileIcon}
              text='Личный кабинет'
              isMobile={props.isMobile}
            />
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
              <HeaderItem text='Профиль' isMobile={props.isMobile} />
            </a>
            <a href='#' className={`${menu__item} ${submenu__item}`}>
              {' '}
              <HeaderItem text='История заказов' isMobile={props.isMobile} />
            </a>
            <a href='#' className={`${menu__item} ${submenu__item}`}>
              {' '}
              <HeaderItem text='Выход' isMobile={props.isMobile} />
            </a>
          </div>
          <a href='#' className={`pt-3 pb-3 pl-0 ${menu__item}`}>
            {' '}
            <HeaderItem
              icon={BurgerIcon}
              text={'Конструктор'}
              isMobile={props.isMobile}
            />
          </a>
          <a href='#' className={`pt-3 pb-3 ${menu__item}`}>
            {' '}
            <HeaderItem
              icon={ListIcon}
              text='Лента заказов'
              isMobile={props.isMobile}
            />
          </a>
        </div>
      </div>
    </header>
  );
}

AppHeader.propTypes = {
  isMobile: PropTypes.bool,
};

export default AppHeader;
