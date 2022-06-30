import PropTypes from 'prop-types';
const ingredientType = PropTypes.shape({
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

export { ingredientType };
