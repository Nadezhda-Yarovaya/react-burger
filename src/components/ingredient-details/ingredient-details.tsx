import { FC } from 'react';
import { useSelector } from '../../hooks/hooks';
import ingredientStyles from './ingredient-details.module.css';

const { text, details, image, nutrients, nutrient, container } =
  ingredientStyles;

const IngredientDetails: FC = () => {
  const selectedCard = useSelector(
    (state) => state.ingredients.currentIngredient
  );

  return (
    <>
      {selectedCard ? (
        <div className={container}>
          <div className={details}>
            <p className={`text text_type_main-medium`}>Детали ингредиента</p>
          </div>
          <img
            className={image}
            src={selectedCard.image}
            alt={selectedCard.name}
          />
          <p className='text text_type_main-medium mt-4 mb-8'>
            {selectedCard.name}
          </p>
          <ul className={`${nutrients}`}>
            <li className={nutrient}>
              {' '}
              <p className={`text text_type_main-small ${text}`}>
                Калории, ккал
              </p>
              <p className={`text text_type_digits-default ${text}`}>
                {selectedCard.calories}
              </p>
            </li>
            <li className={nutrient}>
              {' '}
              <p className={`text text_type_main-small ${text}`}>Белки, г</p>
              <p className={`text text_type_digits-default ${text}`}>
                {selectedCard.proteins}
              </p>
            </li>
            <li className={nutrient}>
              {' '}
              <p className={`text text_type_main-small ${text}`}>Жиры, г</p>
              <p className={`text text_type_digits-default ${text}`}>
                {selectedCard.fat}
              </p>
            </li>
            <li className={nutrient}>
              {' '}
              <p className={`text text_type_main-small ${text}`}>Углеводы, г</p>
              <p className={`text text_type_digits-default ${text}`}>
                {selectedCard.carbohydrates}
              </p>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default IngredientDetails;
