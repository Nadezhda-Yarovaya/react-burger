import { FC } from 'react';

import mealListStyles from './meal-list.module.css';

import Ingredient from '../ingredient/ingredient';
import { useSelector } from 'react-redux';
import { TIngredientUnique } from '../../utils/types';

const { list } = mealListStyles;

type TMealListProps = {
  type: string;
  title: string;
};

const MealList: FC<TMealListProps> = ({ type, title }) => {
  const burgerIngredients = useSelector(
    (store: any) => store.ingredients.ingredientsByCategory
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
          current.map((item: TIngredientUnique) => (
            <Ingredient key={item._id} item={item} />
          ))}
      </ul>
    </>
  );
};

export default MealList;
