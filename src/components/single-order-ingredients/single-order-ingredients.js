import singleOrderIngredientsStyles from "./single-order-ingredients.module.css";

const { list__item, list__image, list__image_more, par, list__item_more } =
  singleOrderIngredientsStyles;

function SingleOrderIngredients(props) {
  const { index, ingredient, positions } = props;

  let imageClass =
    index < 5 ? `${list__image}` : `${list__image} ${list__image_more}`;
  let listItemClass =
    index < 5 ? `${list__item}` : `${list__item} ${list__item_more}`;

  return (
    <li
      className={listItemClass}
      style={{ left: `${index * 42}px`, zIndex: `${positions.length - index}` }}
    >
      <div
        style={{ backgroundImage: `url('${ingredient.image}')` }}
        className={imageClass}
      >
        {index < 5 ? <></> : <p className={par}>+{positions.length - 5}</p>}
      </div>
    </li>
  );
}
export default SingleOrderIngredients;
