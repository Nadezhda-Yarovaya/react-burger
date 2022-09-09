import { FC } from 'react';
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
    <div data-testid='button_placeorder'>
      <Button
        type='primary'
        size={size}
        onClick={handleClick}
        name='totalsumbtn'
        disabled={isDisabled}
      >
        {btnText}
      </Button>
    </div>
  );
};

export default TotalSumButton;
