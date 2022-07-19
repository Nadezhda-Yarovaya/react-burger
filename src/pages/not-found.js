import React from "react";

import { Link } from "react-router-dom";

import notFoundStyles from "./not-found.module.css";

const { container, box, par, link,title } = notFoundStyles;

function NotFound() {
  return (
    <div className={container}>
      <div className={box}>
        <p className={title}>404</p>
        <p className={par}>
          Вернуться на
          <Link to="/" className={link}> Главную</Link>
        </p>
      </div>
    </div>
  );
}

export default NotFound;
