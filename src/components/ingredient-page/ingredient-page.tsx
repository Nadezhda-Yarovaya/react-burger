import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import Main from "../../pages/main";

import { SET_CURRENT, SET_MODALINGREDIENTS } from "../../services/actions";
import IngredientDetails from "../ingredient-details/ingredient-details";
import NotFound from "../../pages/not-found";
import { TNewItem } from "../../utils/types";

  const IngredientPage: FC = () => {
  const allIngredients = useSelector(
    (store) => store.ingredients.listOfIngredients
  );

  type TParams = {
    id: string
  };

  const { id } = useParams<TParams>();
  const history = useHistory();
  const cameFrom = history.location.state ? history.location.state.from : false;
  const dispatch = useDispatch();

  const thisCard = allIngredients.find((item : TNewItem) => item._id === id);

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
