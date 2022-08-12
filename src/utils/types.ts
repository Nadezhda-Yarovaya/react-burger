import PropTypes from 'prop-types';
import React from 'react';
export const ingredientType = PropTypes.shape({
  __id: PropTypes.string,
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  proteins: PropTypes.number,
  price: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  type: PropTypes.string,
});

export type TNewItem = {[key: string] : string | number}

export type TIngredient = {
  _id: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  proteins: number;
  price: number;
  name: string;
  image: string;
  image_mobile: string;
  image_large: string;
  type: string;
}

export type TIngredientUnique = TIngredient & {
  uniqueId: string;
};


export type TLocation = {
  
}

export type TProtectedProps = {
  children: React.ReactNode;
}


export type TRectangle = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}