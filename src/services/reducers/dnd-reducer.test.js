import { firstIngred, firstIngredUniq } from '../../utils/utils';
import {
  INCREASE_DROPPEDELEMENT,
  CLEAR_STUFFINGLIST,
  DELETE_ITEM,
  SET_DROPDIRECTION,
  SET_DRAGGEDCONSTRUCTOR,
  GOUP_POSITION,
  GODOWN_POSITION,
} from '../actions';
import { dndReducer, initialDndState } from './dnd-reducer';

const elementtoMoveDown = { ...firstIngredUniq, uniqueId: 'testid1' };
const elementtoMoveTop = { ...firstIngredUniq, uniqueId: 'testid2' };
const droppedElementsInitial = [
  elementtoMoveDown,
  elementtoMoveTop,
  { ...firstIngredUniq, uniqueId: 'testid3' },
];
const changedDirectionElements = [
  elementtoMoveTop,
  elementtoMoveDown,
  { ...firstIngredUniq, uniqueId: 'testid3' },
];

describe('check inggredients reducer', () => {
  test('should return initial state', () => {
    expect(dndReducer(undefined, {})).toEqual(initialDndState);
  });

  test('should change on action call of INCREASE_DROPPEDELEMENT', () => {
    const expectedPayload = {
      ...initialDndState,
      droppedElements: [{ ...firstIngred, uniqueId: 'test id' }],
    };
    expect(
      dndReducer(
        { ...initialDndState },
        {
          type: INCREASE_DROPPEDELEMENT,
          uniqueId: 'test id',
          element: firstIngred,
        }
      )
    ).toEqual(expectedPayload);
  });

  test('should change on action call of CLEAR_STUFFINGLIST', () => {
    const expectedPayload = {
      droppedElements: initialDndState.droppedElements,
    };
    expect(dndReducer({}, { type: CLEAR_STUFFINGLIST })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of SET_DRAGGEDCONSTRUCTOR', () => {
    const initialIngredOffset = { x: 0, y: 0 };

    const expectedPayload = {
      initialIngredOffset,
    };
    expect(
      dndReducer({}, { type: SET_DRAGGEDCONSTRUCTOR, initialIngredOffset })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of GOUP_POSITION', () => {
    const expectedPayload = {
      ...initialDndState,
      droppedElements: changedDirectionElements,
    };

    expect(
      dndReducer(
        { ...initialDndState, droppedElements: droppedElementsInitial },
        { type: GOUP_POSITION, element: elementtoMoveTop }
      )
    ).toEqual(expectedPayload);
  });

  test('should change on action call of GODOWN_POSITION', () => {
    const expectedPayload = {
      ...initialDndState,
      droppedElements: changedDirectionElements,
    };

    expect(
      dndReducer(
        { ...initialDndState, droppedElements: droppedElementsInitial },
        { type: GODOWN_POSITION, element: elementtoMoveDown }
      )
    ).toEqual(expectedPayload);
  });

  test('should change on action call of DELETE_ITEM', () => {
    const filteredElements = droppedElementsInitial.filter(
      (item) => item.uniqueId !== 'testid1'
    );
    const expectedPayload = {
      ...initialDndState,
      droppedElements: filteredElements,
    };

    expect(
      dndReducer(
        { ...initialDndState, droppedElements: droppedElementsInitial },
        { type: DELETE_ITEM, element: elementtoMoveDown }
      )
    ).toEqual(expectedPayload);
  });

  test('should change on action call of SET_DROPDIRECTION', () => {
    const expectedPayload = {
      dropDirection: 'top',
    };
    expect(dndReducer({}, { type: SET_DROPDIRECTION, payload: 'top' })).toEqual(
      expectedPayload
    );
  });
});
