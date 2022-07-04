import PropTypes from 'prop-types';

import mealListStyles from './meal-list.module.css';

import Ingredient from '../ingredient/ingredient';
import { useSelector } from 'react-redux';

const { list } = mealListStyles;

function MealList(props) {
  const { type, title } = props;

  const burgerIngredients = useSelector(
    (store) => store.ingredients.ingredientsByCategory
  );
  const current = burgerIngredients[type];

  return (
    <>
      <h2
        className={`text text_type_main-medium ${title !== 'Булки' && 'mt-10'}`}
      >
        {title}
      </h2>
      <ul className={`pl-4 pr-4 mt-6 mb-6 ${list}`}>
        {current &&
          current.map((item) => <Ingredient key={item._id} item={item} />)}
      </ul>
    </>
  );
}

MealList.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MealList;
