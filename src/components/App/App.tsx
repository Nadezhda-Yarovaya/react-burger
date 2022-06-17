import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useWindowSize } from '../../hooks/resize.js';
import TotalSum from '../TotalSum/TotalSum';

import appStyles from './app.module.css';

const {
  page,
  main,
  ingredients,
  constructor,
  constructor_displayed,
  constructor_notdisplayed,
} = appStyles;

function App() {
  const [width] = useWindowSize();

  const [isMobileOrdered, setIsMobiledOrdered] = React.useState(false);

  function performOrder() {
    console.log('further to perform order');
  }

  function handleToggleIfMobile() {
    if (isMobileOrdered) {
      performOrder();
    }
    setIsMobiledOrdered(!isMobileOrdered);
  }

  const [isMobile, setIsMobile] = React.useState(false);

  const handleSetMobile = () => {
    if (width < 790) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsMobiledOrdered(false);
    }
  };

  React.useEffect(() => {
    handleSetMobile();
  }, [width]);

  return (
    <div className={page}>
      <AppHeader isMobile={isMobile} />

      <main className={`${main} mb-10`}>
        <section
          className={`mr-10 ${isMobile ? 'pb-10' : ''} ${ingredients} ${
            isMobile ? (isMobileOrdered ? constructor_notdisplayed : '') : ''
          }`}
        >
          <BurgerIngredients />
        </section>
        <section
          className={`${constructor} ${
            isMobile
              ? isMobileOrdered
                ? constructor_displayed
                : constructor_notdisplayed
              : ''
          }`}
        >
          <BurgerConstructor
            isMobileOrdered={isMobileOrdered}
            handleToggleIfMobile={handleToggleIfMobile}
            isMobile={isMobile}
          />

          {isMobile ? (
            <></>
          ) : (
            <TotalSum
              handleToggleIfMobile={handleToggleIfMobile}
              isMobileOrdered={isMobileOrdered}
              buttonSize='large'
              isMobile={isMobile}
            />
          )}
        </section>
        {isMobile ? (
          <TotalSum
            handleToggleIfMobile={handleToggleIfMobile}
            isMobileOrdered={isMobileOrdered}
            buttonSize='small'
            isMobile={isMobile}
          />
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}

export default App;
