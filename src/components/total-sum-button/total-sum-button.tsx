import React, { FC } from 'react';
import { Button } from '../../utils/typesLibrary';

type TButtonProps = {
  handleClick: () => void;
  isDisabled: boolean;
  btnText?: string;
  size: 'small' | 'medium' | 'large';
};

const TotalSumButton: FC<TButtonProps> = ({
  handleClick,
  isDisabled,
  btnText,
  size,
}) => {
  return (
    <>
      <Button
        type='primary'
        size={size}
        onClick={handleClick}
        disabled={isDisabled}
        name='totalsumbtn'
      >
        {btnText}
      </Button>
    </>
  );
};

export default TotalSumButton;
