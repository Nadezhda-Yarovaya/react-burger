import React, { FC, useEffect } from "react";
import { DndProvider } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import appStyles from "../components/app/app.module.css";
import { useSelector } from "react-redux";

import { ifItsMobile } from "../services/selectors";

const { main, ingredients, constructor, section_notdisplayed, section_flex } =
  appStyles;

const Main: FC = () => {
  const isMobile = useSelector(ifItsMobile);
  const isMobileOrdered = useSelector((store: any) => store.mobile.isMobileOrdered);

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
}

export default Main;
