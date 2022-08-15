import React, { FC, useEffect } from 'react';

import feedStyles from './feed.module.css';

const { container, feed } = feedStyles;

const Feed: FC = () => {
  return (
    <>
      <div className={container}>
        <div className={feed}>
          здесь будет страница ленты заказов две секции
        </div>
      </div>
    </>
  );
};
export default Feed;
