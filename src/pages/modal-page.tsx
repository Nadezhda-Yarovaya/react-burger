import feedStyles from './feed.module.css';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

const { container, feed } = feedStyles;

const ModalPage = () => {
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
