import { firstIngred } from '../../utils/utils';
import {
    INCREASE_DROPPEDELEMENT,
    DELETE_ITEM,
    SET_DROPDIRECTION,
    SET_DRAGGEDCONSTRUCTOR,
    GOUP_POSITION,
    GODOWN_POSITION,
    CLEAR_STUFFINGLIST,
  } from '../actions';
import { dndReducer, initialDndState } from './dnd-reducer';


  
describe("check inggredients reducer", () => {
    test("shoult return initial state", () => {
      expect(dndReducer(undefined, {})).toEqual(initialDndState);
    });
  
    /* не знаю, как это оформить ?? 
    test("should change on action call of INCREASE_DROPPEDELEMENT", () => {
      const givenData = {
        uniqueId: 'unique-test-id',
        element: firstIngred
      }
  
      const expectedPayload = {
        droppedElements: [...initialDndState.droppedElements, {...firstIngred, uniqueId: givenData.uniqueId}]
      };
      expect(
        dndReducer(
          {},
          { type: INCREASE_DROPPEDELEMENT, givenData }
        )
      ).toEqual(expectedPayload);
    });
*/
    
});