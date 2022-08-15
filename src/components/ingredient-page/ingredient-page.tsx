import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { SET_CURRENT } from '../../services/actions';
import IngredientDetails from '../ingredient-details/ingredient-details';
import NotFound from '../../pages/not-found';
import { TLocation, TNewItem } from '../../utils/types';

const IngredientPage: FC = () => {
  const allIngredients = useSelector(
    (store: any) => store.ingredients.listOfIngredients
  );

  type TParams = {
    id: string;
  };

  const { id } = useParams<TParams>();
  const location = useLocation<TLocation>();
  const cameFrom = location.state ? location.state.from : false;
  const dispatch = useDispatch();

  const thisCard = allIngredients.find((item: TNewItem) => item._id === id);

  useEffect(() => {
    if (thisCard) {
      dispatch({
        type: SET_CURRENT,
        currentIngredient: thisCard,
      });
    }
  }, [allIngredients, cameFrom, thisCard]);

  return <> {thisCard ? <IngredientDetails /> : <NotFound />}</>;
};
export default IngredientPage;
