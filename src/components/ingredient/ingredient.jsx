import mealListStyles from '../meal-list/meal-list.module.css';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient(props) {
  const { list, list__item, price, item__name, counter, list__choice } =
    mealListStyles;

  const { item, changeChoice } = props;
  /*
    const ingredientCount = useSelector(store=>{
      let totalCount = 0;
      store.listOfIngredients.forEach(curItem=> {
        if (curItem._id === item.id) {totalCount++;}
      });
      return totalCount;
    })*/

  const ingredientCount = useSelector((store) => {
    let totalCount = 0;
    store.droppedElements.forEach((curItem) => {
      if (curItem._id === item._id) {
        totalCount++;
      }
    });
    return totalCount;
  });

  const { _id } = item;
  //console.log('item itself:', item);

  const [, draggedIngredientRef] = useDrag({
    type: 'ingredient',
    item: { item },
    /*  collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })*/
  });

  return (
    <li key={item._id} className={list__item} ref={draggedIngredientRef}>
      <button
        onClick={() => {
          /* changeChoice(currentList, item._id, setWithChoice);*/
          changeChoice(item);
        }}
        className={list__choice}
      >
        <img src={item.image} alt={item.name} />
        <div className={`mt-2 mb-2 ${price}`}>
          {' '}
          <p className='text text_type_digits-default mr-2'>{item.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className={`text text_type_main-default ${item__name}`}>
          {item.name}
        </p>
        {ingredientCount > 0 ? (
          <div className={counter}>
            <Counter count={ingredientCount} size='default' />
          </div>
        ) : (
          <></>
        )}
      </button>
    </li>
  );
}

export default Ingredient;
