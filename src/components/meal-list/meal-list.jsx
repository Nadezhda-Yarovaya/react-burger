import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import mealListStyles from './meal-list.module.css';

import { ingredientType } from '../../utils/types';
import Ingredient from '../ingredient/ingredient';
import { useSelector } from 'react-redux';

const { list, list__item, price, item__name, counter, list__choice } =
  mealListStyles;

function MealList(props) {
  const { type, title, } = props;
  //console.log(currentList);



  
  const burgerIngredients = useSelector((store) => {
//    console.log('mist her? ', store);
    return store.ingredients.ingredientsByCategory});

    const current = burgerIngredients[type];
    //const current = [];
  return (
    <>
      <h2
        className={`text text_type_main-medium ${title !== 'Булки' && 'mt-10'}`}
      >
        {title}
      </h2>
      <ul className={`pl-4 pr-4 mt-6 mb-6 ${list}`}>
        {(current) && (current.map((item) => (
          <Ingredient key={item._id} item={item}  />
        )))}
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
