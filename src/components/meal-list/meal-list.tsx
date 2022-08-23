import { FC } from 'react';

import mealListStyles from './meal-list.module.css';

import Ingredient from '../ingredient/ingredient';
import { TIngredient, TIngredientUnique } from '../../utils/types';
import { useSelector } from '../../hooks/hooks';

const { list } = mealListStyles;

type TMealListProps = {
  type: string;
  title: string;
};

const MealList: FC<TMealListProps> = ({ type, title }) => {
  const burgerIngredients = useSelector(
    (store) => store.ingredients.ingredientsByCategory
  );
  let current: Array<TIngredient> = burgerIngredients.bun;
  if (type === 'sauce') {current = burgerIngredients.sauce; }
  if (type === 'main') {current = burgerIngredients.main; }

  console.log(current);

  return (
    <>
      <h2
        className={`text text_type_main-medium ${title !== 'Булки' && 'mt-10'}`}
      >
        {title}
      </h2>
      <ul className={`pl-4 pr-4 mt-6 mb-6 ${list}`}>
        {current &&
          current.map((item: TIngredient) => (
            <Ingredient key={item._id} item={item} />
          ))}
      </ul>
    </>
  );
};

export default MealList;
