
import ingredientStyles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

const {
    text,
    details,
    image,
    nutrients,
    nutrient
  } = ingredientStyles;

function IngredientDetails(props) {

    const {selectedCard} = props;
    return (
        <>
<div className={`${details}`}>
              <p className='text text_type_main-medium'>Детали ингредиента</p>
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
                <p className={`text text_type_main-small ${text}`}>
                  Белки, г
                </p>
                <p className={`text text_type_digits-default ${text}`}>
                  {selectedCard.proteins}
                </p>
              </li>
              <li className={nutrient}>
                {' '}
                <p className={`text text_type_main-small ${text}`}>
                  Жиры, г
                </p>
                <p className={`text text_type_digits-default ${text}`}>
                  {selectedCard.fat}
                </p>
              </li>
              <li className={nutrient}>
                {' '}
                <p className={`text text_type_main-small ${text}`}>
                  Углеводы, г
                </p>
                <p className={`text text_type_digits-default ${text}`}>
                  {selectedCard.carbohydrates}
                </p>
              </li>
            </ul></>

    );
}

const ingredientsPropTypes = PropTypes.shape({  
  __id: PropTypes.string,
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  proteins: PropTypes.number,
  price: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  type: PropTypes.string,
});

IngredientDetails.propTypes = {
  selectedCard: ingredientsPropTypes,
};


export default IngredientDetails;