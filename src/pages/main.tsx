//@ts-nocheck
import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import appStyles from '../components/app/app.module.css';

import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { useSelector } from '../hooks/hooks';

const { main, ingredients, constructor, section_notdisplayed, section_flex } =
  appStyles;

const Main: FC = () => {
  const isMobile = useSelector((store) => store.mobile.isLogged);
  const isMobileOrdered = useSelector((store) => store.mobile.isMobileOrdered);

  // проблема в backend, если делать без ts-nocheck
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <main className={`${main} mb-10`}>
        <section
          className={`mr-10} ${ingredients} ${
            isMobile && isMobileOrdered ? section_notdisplayed : section_flex
          }`}
        >
          <BurgerIngredients />
        </section>
        <section className={`${constructor}`}>
          <BurgerConstructor />
        </section>
      </main>
    </DndProvider>
  );
};

export default Main;
