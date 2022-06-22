import PropTypes from 'prop-types';

import headerItemStyles from './header-item.module.css';

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const texts = ['Конструктор', 'Лента заказов', 'Личный кабинет'];
const icons = [BurgerIcon, ListIcon, ProfileIcon];
let Icon = icons[0];

function HeaderItem(props) {
  texts.forEach((item, ind) => {
    if (item === props.text) {
      Icon = icons[ind];
    }
  });

  return (
    <>
      {props.isMobile ? (
        <></>
      ) : (
        <div className={`${props.isMobile ? 'mr-2' : 'ml-1 mr-2'}`}>
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
  isMobile: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
};

export default HeaderItem;
