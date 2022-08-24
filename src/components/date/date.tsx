import { FC } from "react";
import { TOrderWithIngredients } from "../../utils/types";


import dateStyles from './date.module.css';








type TDate = {
    item: TOrderWithIngredients;
}


const DateOrder:FC<TDate> = ({item}) => {

    const orderDate = new Date(item.createdAt);
    const today = new Date();
    const daysDiff = Math.round(
      (today.getTime() - orderDate.getTime()) / (1000 * 3600 * 24)
    );
    const lastDigit = parseInt(daysDiff.toString().slice(-1));
    const howMany =
      daysDiff > 20 && lastDigit === 1
        ? daysDiff + ' день назад'
        : daysDiff + ' дней назад';
    const howManyTwo =
      lastDigit === (2 || 3 || 4) ? daysDiff + ' дня назад' : howMany;
    const isYesterday = daysDiff === 1 ? 'Вчера' : howManyTwo;
    const isOrderOfToday =
      today.toLocaleDateString() === orderDate.toLocaleDateString();
    const dateName = isOrderOfToday ? 'Сегодня' : isYesterday;
    const minutes =
      orderDate.getMinutes() < 10
        ? '0' + orderDate.getMinutes()
        : orderDate.getMinutes();

    const GMTzone = -orderDate.getTimezoneOffset() / 60;
    const signPlusOrMinus = GMTzone > 0 ? '+' : '';
    const finalDate =
      dateName +
      ', ' +
      orderDate.getHours() +
      ':' +
      minutes +
      ' i-GMT' +
      signPlusOrMinus +
      GMTzone;



    return (
        <p className={dateStyles.date}>{finalDate}</p>
    );
}

export default DateOrder;