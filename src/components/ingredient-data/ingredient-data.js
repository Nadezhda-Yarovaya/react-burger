import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import Main from "../../pages/main";

import { SET_CURRENT, SET_MODALINGREDIENTS } from "../../services/actions";
import IngredientDetails from "../ingredient-details/ingredient-details";
import NotFound from "../../pages/not-found";

function IngredientData() {
  const allIngredients = useSelector(
    (store) => store.ingredients.listOfIngredients
  );

  const { id } = useParams();
  const history = useHistory();
  const cameFrom = history.location.state ? history.location.state.from : false;
  const dispatch = useDispatch();

  const thisCard = allIngredients.find((item) => item._id === id);

  useEffect(() => {
    if (thisCard) {
      dispatch({
        type: SET_CURRENT,
        currentIngredient: thisCard,
      });
      if (cameFrom === "/") {
        dispatch({
          type: SET_MODALINGREDIENTS, // вот здесь задаю, показывать ли модалку. areIngredientsShown = тру
        });
      }
    }
  }, [allIngredients, cameFrom, thisCard]);

  return (
    <>
      {cameFrom === "/" ? (
        <Main />
      ) : thisCard ? (
        <IngredientDetails />
      ) : (
        <NotFound />
      )}
    </>
  );
}
export default IngredientData;
