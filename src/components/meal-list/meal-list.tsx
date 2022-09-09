import { FC } from 'react';

import mealListStyles from './meal-list.module.css';

import Ingredient from '../ingredient/ingredient';
import { TIngredient } from '../../utils/types';
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
  let currentId: string = 'listbuns';
  if (type === 'sauce') {
    current = burgerIngredients.sauce;
    currentId = 'listsauce';
  }
  if (type === 'main') {
    current = burgerIngredients.main;
    currentId = 'listmain';
  }

  return (
    <>
      <h2
        className={`text text_type_main-medium ${title !== 'Булки' && 'mt-10'}`}
      >
        {title}
      </h2>
      <ul className={`pl-4 pr-4 mt-6 mb-6 ${list}`}>
        {current &&
          current.map((item, index) => (
            <Ingredient
              key={item._id}
              item={item}
              testId={`${currentId}-${index}`}
            />
          ))}
      </ul>
    </>
  );
};

export default MealList;
