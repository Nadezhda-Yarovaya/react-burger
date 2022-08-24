import { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { SET_CURRENT } from '../../services/actions';
import IngredientDetails from '../ingredient-details/ingredient-details';
import NotFound from '../../pages/not-found';
import ingredPageStyles from './ingredient-page.module.css';
import {
  TIngredientUnique,
  TLocation,
  TNewItem,
  TParams,
} from '../../utils/types';
import { useDispatch, useSelector } from '../../hooks/hooks';

const IngredientPage: FC = () => {
  const allIngredients = useSelector(
    (store: any) => store.ingredients.listOfIngredients
  );

  const { id } = useParams<TParams>();
  const location = useLocation<TLocation>();
  const cameFrom = location.state ? location.state.from : false;
  const dispatch = useDispatch();

  const thisCard: TIngredientUnique = allIngredients.find(
    (item: TNewItem) => item._id === id
  );

  useEffect(() => {
    if (thisCard) {
      dispatch({
        type: SET_CURRENT,
        currentIngredient: thisCard,
      });
    }
  }, [allIngredients, cameFrom, thisCard]);

  return <> {thisCard ? <div className={ingredPageStyles.box}><IngredientDetails /></div> : <NotFound />}</>;
};
export default IngredientPage;
