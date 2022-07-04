import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';



import currencyBig from '../../images/currency36x36.svg';

/* посмотреть, как тотал сам теперь высчитывать "динамически" */

//import { IfMobileContext } from '../../services/app-contexts';
import { useSelector } from 'react-redux';
import { ifItsMobile } from '../../services/selectors';



function TotalSumButton(props) {

    return (
        <>
        <Button
        type='primary'
        size={props.size}
        onClick={props.handleClick}
        disabled={props.isDisabled}
      >
        {props.btnText}
      </Button>

      </>
    );
}

export default TotalSumButton;