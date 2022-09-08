import { FC } from 'react';
import { Button } from '../../utils/typesLibrary';

type TButtonProps = {
  handleClick: () => void;
  isDisabled: boolean;
  btnText?: string;
  size: 'small' | 'medium' | 'large';
};

/*
  <Button
        type='primary'
        size={size}
        onClick={handleClick}
        disabled={isDisabled}
        name='totalsumbtn'
      >
        {btnText}
      </Button>*/

const TotalSumButton: FC<TButtonProps> = ({
  handleClick,
  isDisabled,
  btnText,
  size,
}) => {
  return (
      <button
        onClick={handleClick}
        name='totalsumbtn'
        data-testid='button_placeorder'
        type='button'
      >
        {btnText}
      </button>
  );
};

export default TotalSumButton;
