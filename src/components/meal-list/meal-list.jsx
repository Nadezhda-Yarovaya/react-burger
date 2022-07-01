import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import mealListStyles from './meal-list.module.css';

import { ingredientType } from '../../utils/types';
import Ingredient from '../ingredient/ingredient';

const { list, list__item, price, item__name, counter, list__choice } =
  mealListStyles;

function MealList(props) {
  const { currentList, title, changeChoice } = props;
  //console.log(currentList);

  return (
    <>
      <h2
        className={`text text_type_main-medium ${title !== 'Булки' && 'mt-10'}`}
      >
        {title}
      </h2>
      <ul className={`pl-4 pr-4 mt-6 mb-6 ${list}`}>
        {currentList.map((item) => (
          <Ingredient key={item._id} item={item} changeChoice={changeChoice} />
        ))}
      </ul>
    </>
  );
}

MealList.propTypes = {
  /*  currentList: PropTypes.arrayOf(ingredientType).isRequired,
  title: PropTypes.string.isRequired,
  changeChoice: PropTypes.func.isRequired,*/
};

export default MealList;
