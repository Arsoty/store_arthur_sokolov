export const LocalStorageReducer =
  (reducer, localStorageName) => (state, action) => {
    if (!state && localStorage[localStorageName]) {
      return JSON.parse(localStorage[localStorageName]);
    } else {
      let newState = reducer(state, action);
      localStorage.setItem(localStorageName, JSON.stringify(newState));
      return newState;
    }
  };
