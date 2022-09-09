import { FC, useEffect } from 'react';
import IndividualOrder from '../components/individul-order/individual-order';
import PreloaderBurger from '../components/preloader/preloader';
import { useDispatch, useSelector } from '../hooks/hooks';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from '../services/actions/feed-ws-actions';
import style from './feed-id.module.css';

const FeedId: FC = () => {
  const wsFeedConnecting = useSelector((state) => state.feedWs.isConnecting);
  // const { id } = useParams<TParams>();
  const baseUrl = 'wss://norma.nomoreparties.space/orders';

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${baseUrl}/all`,
    });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <div className={style.order}>
      {wsFeedConnecting ? <PreloaderBurger /> : <IndividualOrder />}
    </div>
  );
};

export default FeedId;
