import PropTypes from 'prop-types';

import headerItemStyles from './header-item.module.css';

function HeaderItem(props) {
  return (
    <>
      {props.icon ? (
        <div className={`${props.isMobile ? 'mr-2' : 'ml-1 mr-2'}`}>
          <props.icon type={`${props.secondary ? 'secondary' : 'primary'}`} />
        </div>) : ( <></>  )}
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
  isMobile: PropTypes.bool,
  text: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
};

export default HeaderItem;
