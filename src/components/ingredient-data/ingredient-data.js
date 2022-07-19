
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory,  useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Main from "../../pages/main";

import {
  SET_CURRENT,
  SET_MODALINGREDIENTS,
} from '../../services/actions';
import IngredientDetails from '../ingredient-details/ingredient-details';

function IngredientData() {
   const allIngredients = useSelector((store) => store.ingredients.listOfIngredients);

  // const [selectedCard, setSelectedCard] = useState({});
  const { id } = useParams();

  const history = useHistory();
  
  const cameFrom = history.location.state ? history.location.state.from : false;

  const dispatch = useDispatch();

  /*
  const location = useLocation();
  console.log('location: ', location);*/
  
  useEffect(() => {
    const thisCard = allIngredients.find(item => item._id === id);
    // console.log(thisCard);
    if (thisCard) {
      dispatch({
        type: SET_CURRENT,
        currentIngredient: thisCard,
      });
      if (cameFrom === '/') {
      dispatch({
        type: SET_MODALINGREDIENTS, // вот здесь задаю, показывать ли модалку. areIngredientsShown = тру
      });
    }
    }
  }, [allIngredients, cameFrom]);

  return (
    <>
    {cameFrom === '/' ? <Main /> : <IngredientDetails />}
    </>
  );
}
export default IngredientData;
