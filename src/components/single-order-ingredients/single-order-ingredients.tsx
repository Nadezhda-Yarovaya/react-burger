import { FC } from 'react';
import { TIngredient, TIngredientQty } from '../../utils/types';
import singleOrderIngredientsStyles from './single-order-ingredients.module.css';

const { list__item, list__image, list__image_more, par, list__item_more } =
  singleOrderIngredientsStyles;

type TSingleOrderProps = {
  index: number;
  ingredient: TIngredientQty | undefined;
  positions: Array<TIngredientQty | undefined>;
  amountOfIngreds: number;
};

const SingleOrderIngredients: FC<TSingleOrderProps> = ({
  index,
  ingredient,
  positions,
  amountOfIngreds,
}) => {
  let imageClass =
    index < 5 ? `${list__image}` : `${list__image} ${list__image_more}`;
  let listItemClass =
    index < 5 ? `${list__item}` : `${list__item} ${list__item_more}`;

  return (
    <>
      {ingredient && ingredient.image && (
        <li
          className={listItemClass}
          style={{
            left: `${index * 42}px`,
            zIndex: `${positions.length - index}`,
          }}
        >
          <div
            style={{ backgroundImage: `url('${ingredient.image}')` }}
            className={imageClass}
          >
            {index < 5 ? <></> : <p className={par}>+{amountOfIngreds - 5}</p>}
          </div>
        </li>
      )}
    </>
  );
};
export default SingleOrderIngredients;
