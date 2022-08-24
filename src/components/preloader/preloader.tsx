import { FC } from "react";
import preloaderStyle from "./preloader.module.css";

const PreloaderBurger: FC = () => {
  return (
    <div className={preloaderStyle.preloaderContainer}>
      <div className={preloaderStyle.preloader}></div>
    </div>
  );
};

export default PreloaderBurger;
