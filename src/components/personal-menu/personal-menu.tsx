import personalMenuStyles from './personal-menu.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { performLogout } from '../../services/action-creators/auth-action-creators';
import { FC, SyntheticEvent } from 'react';
const { menu, menu__item, navigation, par, menu__item_active } =
  personalMenuStyles;

const PersonalMenu: FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  function handleLogout(e: SyntheticEvent) {
    e.preventDefault();
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch<any>(performLogout(refreshToken, history));
  }

  return (
    <div className={navigation}>
      <nav className={menu}>
        <NavLink
          exact
          to='/profile'
          className={menu__item}
          activeClassName={menu__item_active}
        >
          Профиль
        </NavLink>

        <NavLink
          to='/profile/orders'
          className={menu__item}
          activeClassName={menu__item_active}
        >
          История заказов
        </NavLink>

        <button className={menu__item} onClick={handleLogout}>
          Выход
        </button>
      </nav>

      <p className={par}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
};

export default PersonalMenu;
