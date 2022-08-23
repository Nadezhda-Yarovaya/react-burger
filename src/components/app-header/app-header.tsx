import React, { FunctionComponent, SyntheticEvent } from 'react';
import { useLocation } from 'react-router-dom';

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
  MenuIcon,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import HeaderItem from '../header-item/header-item';
import headerStyles from './app-header.module.css';
import logoMobile from '../../images/logomobile.svg';
import openSubmIcon from '../../images/openSubmenu.svg';
import closeSubmIcon from '../../images/closeSubmenu.svg';
import {
  OPEN_MOBILEMENU,
  CLOSE_MOBILEMENU,
  UNFOLD_SUBMOBILEMENU,
  FOLD_SUBMOBILEMENU,
} from '../../services/actions';

import { Link, NavLink, useHistory } from 'react-router-dom';

import { performLogout } from '../../services/action-creators/auth-action-creators';
import { TLocation } from '../../utils/types';
import { useDispatch, useSelector } from '../../hooks/hooks';

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
  mobilemenu__top,
  mobilemenu_state_opened,
  mobilemenu__list,
  header__mobile,
  header__mobilebutton,
  menu__item_active,
} = headerStyles;

const AppHeader: FunctionComponent = () => {
  const location = useLocation<TLocation>();
  const history = useHistory();
  const dispatch = useDispatch();
  const curLocation = location.pathname;

  const isMobileMenuOpened = useSelector(
    (state) => state.mobile.isMobileMenuOpened
  );

  const isSubMenuOpened = useSelector(
    (state) => state.mobile.isSubMenuOpened
  );

  function openMobileMenu(): void {
    dispatch({
      type: OPEN_MOBILEMENU,
    });
  }

  function closeMobileMenu(): void {
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

  function handleLogoutMobile(e: SyntheticEvent): void {
    handleLogout(e);
    closeMobileMenu();
  }

  function handleLogout(e: SyntheticEvent): void {
    e.preventDefault();
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
    dispatch(performLogout(refreshToken, history));
    }
  }

  const headerDivStyles: React.CSSProperties = {
    width: '300px',
    display: 'flex',
    justifyContent: 'flex-end',
  };

  return (
    <header className={header}>
      <div className={`pt-4 pb-2 ${header__container}`}>
        <div className={header__desktop}>
          <nav className={menu}>
            <NavLink
              exact
              to='/'
              className={`mr-6 ${menu__item}`}
              activeClassName={menu__item_active}
            >
              <HeaderItem id={1} icon={BurgerIcon} text='Конструктор' />{' '}
            </NavLink>

            <NavLink
              to='/feed'
              className={`ml-5 ${menu__item}`}
              activeClassName={menu__item_active}
            >
              <HeaderItem id={2} icon={ListIcon} text='Лента заказов' />
            </NavLink>
          </nav>

          <div className={logo}>
            <Link to='/'>
              <Logo />
            </Link>
          </div>

          <div style={headerDivStyles}>
            <NavLink
              to='/profile'
              style={{ margin: '0 40px 0 0' }}
              className={`${menu__item} ${
                curLocation === 'profile/orders' ? menu__item_active : ''
              }`}
              activeClassName={menu__item_active}
            >
              <HeaderItem id={3} icon={ProfileIcon} text='Личный кабинет' />
            </NavLink>
          </div>
        </div>

        <div className={header__mobile}>
          <Link to='/'>
            <img src={logoMobile} alt='логотип мобильная версия' />
          </Link>

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
          <button
            className={`${menu__item}`}
            onClick={toggleSubMenu}
            style={{
              color: `${
                location.pathname === '/profile' ||
                location.pathname === '/orders'
                  ? '#f2f2f3'
                  : ''
              }`,
            }}
          >
            <HeaderItem text='Личный кабинет' id={3} icon={ProfileIcon} />

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
            <NavLink
              to='/profile'
              className={menu__item}
              activeClassName={menu__item_active}
              onClick={closeMobileMenu}
            >
              <HeaderItem text='Профиль' sub={true} />
            </NavLink>

            <NavLink
              to='/orders'
              className={menu__item}
              activeClassName={menu__item_active}
              onClick={closeMobileMenu}
            >
              <HeaderItem text='История заказов' sub={true} />
            </NavLink>

            <button className={menu__item} onClick={handleLogoutMobile}>
              <HeaderItem text='Выход' sub={true} />
            </button>
          </div>

          <NavLink
            to='/'
            exact
            className={menu__item}
            activeClassName={menu__item_active}
            onClick={closeMobileMenu}
          >
            {' '}
            <HeaderItem text='Конструктор' id={1} icon={BurgerIcon} />
          </NavLink>

          <NavLink
            to='/feed'
            className={menu__item}
            activeClassName={menu__item_active}
            onClick={closeMobileMenu}
          >
            {' '}
            <HeaderItem text='Лента заказов' id={2} icon={ListIcon} />{' '}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
