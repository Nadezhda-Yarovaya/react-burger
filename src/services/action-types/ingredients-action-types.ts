import { TByCategory, TDefaultIngred, TIngredient } from '../../utils/types';
import {
    SET_ALLINGREDIENTS_REQUEST,
    SET_ALLINGREDIENTS_SUCCESS,
    SET_ALLINGREDIENTS_FAILURE,
    SET_INGREDIENTSBYCAT,
    REPLACE_BUN,
    SET_CURRENT,
    REMOVE_CURRENT,
    SET_MODALINGREDIENTS,
    REMOVE_MODALINGREDIENTS,
    CLEAR_BUN
  } from '../actions';


  
  export interface ISetAllIngredientsReq {
    readonly type: typeof SET_ALLINGREDIENTS_REQUEST;
      readonly isLoading: boolean;
  }
  
  export interface ISetAllIngredientsSuccess {
      readonly type: typeof SET_ALLINGREDIENTS_SUCCESS;
      readonly payload: {listOfIngredients: Array<TIngredient>};
      readonly isLoading: boolean;
    }

    export interface ISetAllIngredientsFailure {
        readonly type: typeof SET_ALLINGREDIENTS_FAILURE;
          readonly isLoading: boolean;
      }

      export interface IClearBun {
        readonly type: typeof CLEAR_BUN;
        readonly bun: {bun: TIngredient};
      }

      export interface ISetByCategory{
        readonly type: typeof SET_INGREDIENTSBYCAT;
        readonly payload: {ingredientsByCategory: TByCategory};
      }
      
   
        export interface IReplaceBun {
            readonly type: typeof REPLACE_BUN;
            readonly bun: {bun: TIngredient};
          }

          export interface ISetCurrent{
            readonly type: typeof SET_CURRENT;
            readonly currentIngredient: {currentIngredient: TIngredient};
          }

          
          export interface IRemoveCurrent{
            readonly type: typeof REMOVE_CURRENT;
            readonly currentIngredient: {currentIngredient: TDefaultIngred};
          }

          
    export interface ISetModal{
        readonly type: typeof SET_MODALINGREDIENTS;
          readonly areIngredientsShown: boolean;
      }


      export interface IRemoveModal {
        readonly type: typeof REMOVE_MODALINGREDIENTS;
          readonly areIngredientsShown: boolean;
      }


        
    export type TIngedientsActions = 
        | ISetAllIngredientsReq
        | ISetAllIngredientsSuccess
        | ISetAllIngredientsFailure
        | IClearBun
        |ISetByCategory 
        | IReplaceBun
        | ISetCurrent
        | IRemoveCurrent
        | ISetModal
        | IRemoveModal;