import React, { FC, SyntheticEvent } from 'react';
import {
  Button as ButtonUI,
  Tab as TabUI,
  ConstructorElement as ConstructorElementUI,
} from '@ya.praktikum/react-developer-burger-ui-components';

type TButton = {
  type?: 'primary' | 'secondary';
  size?: 'small' | 'large' | 'medium';
  onClick?: (() => void) | ((evt: SyntheticEvent<Element, Event>) => void);
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  className?: string;
  name?: string;
  children?: React.ReactNode;
};

export const Button: FC<TButton> = ButtonUI;

type TTab = {
  active: boolean;
  value: string;
  onClick: (value: string) => void;
  children?: React.ReactNode;
};
export const Tab: FC<TTab> = TabUI;

type TConstructorElement = {
  type?: 'top' | 'bottom';
  isLocked?: boolean;
  handleClose?: () => void;
  text: string;
  price: number;
  thumbnail: string;
  children?: React.ReactNode;
};

export const ConstructorElement: FC<TConstructorElement> = ConstructorElementUI;
