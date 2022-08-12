import React, { FC, useEffect } from "react";
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

type TButtonProps = {
  handleClick : () => void;
  isDisabled: boolean;
  btnText : string;
  size?: string;
}

const TotalSumButton: FC<TButtonProps> = ({handleClick, isDisabled, btnText, size}) => {
  return (
    <>
      <Button
        type='primary'
        size={size}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {btnText}
      </Button>
    </>
  );
}
/*
TotalSumButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  btnText: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
}; */

export default TotalSumButton;
