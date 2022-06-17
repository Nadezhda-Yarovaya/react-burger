import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import mealListStyles from './meal-list.module.css';

const { list, list__item, price, item__name, counter, list__choice } =
  mealListStyles;

function MealList(props) {
  const { currentList, title, changeChoice, setWithChoice } = props;

  return (
    <>
      <h2
        className={`text text_type_main-medium ${title !== 'Булки' && 'mt-10'}`}
      >
        {title}
      </h2>
      <ul className={`pl-4 pr-4 mt-6 mb-6 ${list}`}>
        {currentList.map((item) => (
          <li key={item._id} className={list__item}>
            <button
              onClick={() => {
                changeChoice(currentList, item._id, setWithChoice);
              }}
              className={list__choice}
            >
              <img src={item.image} alt={item.name} />
              <div className={`mt-2 mb-2 ${price}`}>
                {' '}
                <p className='text text_type_digits-default mr-2'>
                  {item.price}
                </p>
                <CurrencyIcon type='primary' />
              </div>
              <p className={`text text_type_main-default ${item__name}`}>
                {item.name}
              </p>
              {item.chosen ? (
                <div className={counter}>
                  <Counter count={1} size='default' />
                </div>
              ) : (
                <></>
              )}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

MealList.propTypes = {
  currentList: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  changeChoice: PropTypes.func.isRequired,
  setWithChoice: PropTypes.func.isRequired,
};

export default MealList;
