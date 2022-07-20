import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import Main from "../../pages/main";

import { SET_CURRENT, SET_MODALINGREDIENTS } from "../../services/actions";
import IngredientDetails from "../ingredient-details/ingredient-details";
import NotFound from "../../pages/not-found";

function IngredientPage() {
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
    }
  }, [allIngredients, cameFrom, thisCard]);

  return <> {thisCard ? <IngredientDetails /> : <NotFound />}</>;
}
export default IngredientPage;
