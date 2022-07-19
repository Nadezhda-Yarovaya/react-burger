import React, { useEffect } from 'react';

import feedStyles from './feed.module.css';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

const { container, feed } = feedStyles;

function ModalPage() {
    // мне надо убрать модалку тогда, а когда на Ingredient нажимаешь в редакс идет карточка нужная, и 
    // ingredientDetails ее ловит и показывает данные в таблице
  return (
    <>
      <div className={container}>
        <div className={feed}>
           <IngredientDetails />
            </div></div>         
    </>
  );
}
export default ModalPage;
