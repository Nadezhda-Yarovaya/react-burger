import feedStyles from './feed.module.css';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { FC } from 'react';

const { container, feed } = feedStyles;

const ModalPage: FC = () => {
  return (
    <>
      <div className={container}>
        <div className={feed}>
          <IngredientDetails />
        </div>
      </div>
    </>
  );
};
export default ModalPage;
