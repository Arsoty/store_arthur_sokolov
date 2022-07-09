export const CategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_CAT":
      return { cat: action.payload };
    default:
      return state;
  }
};
