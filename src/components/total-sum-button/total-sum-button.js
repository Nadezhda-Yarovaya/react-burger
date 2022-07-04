import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

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

TotalSumButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  btnText: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default TotalSumButton;
