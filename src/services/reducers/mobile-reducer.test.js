import { firstIngred } from '../../utils/utils';
import {
  SET_IFMOBILE,
  SET_IFMOBILEORDERED,
  SET_WINDOWDATA,
  OPEN_MOBILEMENU,
  CLOSE_MOBILEMENU,
  UNFOLD_SUBMOBILEMENU,
  FOLD_SUBMOBILEMENU,
  SET_TOUCHEDITEM,
  CLEAR_TOUCHEDITEM,
  SET_OFFSETS,
  SET_INITIALS,
  SET_FINALS,
  CLEAR_INITIALS,
  CLEAR_FINALS,
} from '../actions';
import { initialMobileState, mobileReducer } from './mobile-reducer';

describe('check feed socket reducer', () => {
  test('should return initial state', () => {
    expect(mobileReducer(undefined, {})).toEqual(initialMobileState);
  });

  test('should change on action call of SET_IFMOBILE', () => {
    const expectedPayload = {
      isMobile: true,
    };
    expect(mobileReducer({}, { type: SET_IFMOBILE, payload: true })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of SET_IFMOBILEORDERED', () => {
    const expectedPayload = {
      isMobileOrdered: true,
    };
    expect(
      mobileReducer({}, { type: SET_IFMOBILEORDERED, payload: true })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of SET_WINDOWDATA', () => {
    const windowData = { width: 100, height: 100 };
    const expectedPayload = {
      windowData,
    };
    expect(
      mobileReducer({}, { type: SET_WINDOWDATA, payload: windowData })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of OPEN_MOBILEMENU', () => {
    const expectedPayload = {
      isMobileMenuOpened: true,
    };
    expect(mobileReducer({}, { type: OPEN_MOBILEMENU })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of CLOSE_MOBILEMENU', () => {
    const expectedPayload = {
      isMobileMenuOpened: false,
    };
    expect(mobileReducer({}, { type: CLOSE_MOBILEMENU })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of UNFOLD_SUBMOBILEMENU', () => {
    const expectedPayload = {
      isSubMenuOpened: true,
    };
    expect(mobileReducer({}, { type: UNFOLD_SUBMOBILEMENU })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of FOLD_SUBMOBILEMENU', () => {
    const expectedPayload = {
      isSubMenuOpened: false,
    };
    expect(mobileReducer({}, { type: FOLD_SUBMOBILEMENU })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of SET_TOUCHEDITEM', () => {
    const currentTouchedItem = firstIngred;
    const expectedPayload = {
      currentTouchedItem,
    };
    expect(
      mobileReducer({}, { type: SET_TOUCHEDITEM, payload: currentTouchedItem })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of CLEAR_TOUCHEDITEM', () => {
    const expectedPayload = {
      currentTouchedItem: {},
    };
    expect(mobileReducer({}, { type: CLEAR_TOUCHEDITEM })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of SET_OFFSETS', () => {
    const rectangle = { top: 100, right: 100 };
    const expectedPayload = {
      offsets: {
        rectangle,
      },
    };
    expect(
      mobileReducer({}, { type: SET_OFFSETS, payload: rectangle })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of SET_INITIALS', () => {
    const initials = { x: 100, y: 100 };
    const expectedPayload = {
      offsets: {
        initials,
      },
    };
    expect(
      mobileReducer({}, { type: SET_INITIALS, payload: initials })
    ).toEqual(expectedPayload);
  });

  test('should change on action call of SET_FINALS', () => {
    const finals = { x: 200, y: 200 };
    const expectedPayload = {
      offsets: {
        finals,
      },
    };
    expect(mobileReducer({}, { type: SET_FINALS, payload: finals })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of CLEAR_INITIALS', () => {
    const expectedPayload = {
      offsets: {
        initials: initialMobileState.offsets.initials,
      },
    };
    expect(mobileReducer({}, { type: CLEAR_INITIALS })).toEqual(
      expectedPayload
    );
  });

  test('should change on action call of CLEAR_FINALS', () => {
    const expectedPayload = {
      offsets: {
        finals: initialMobileState.offsets.finals,
      },
    };
    expect(mobileReducer({}, { type: CLEAR_FINALS })).toEqual(expectedPayload);
  });
});
