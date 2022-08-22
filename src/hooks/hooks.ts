import {
    TypedUseSelectorHook,
    useSelector as selectorHook,
    useDispatch as dispatchHook,
  } from 'react-redux';
import {  AppDispatch, RootState } from '..';
import { AppThunk } from '../utils/types';
  
  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook; 

  export const useDispatch = () => dispatchHook<AppDispatch>(); 