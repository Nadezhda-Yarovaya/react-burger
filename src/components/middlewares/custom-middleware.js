
export const customMiddleware = 
({initRequestor}) =>
(store) => 
(next) => 
(action) => {
    const {dispatch, getState} = store;

    return next(action);
};