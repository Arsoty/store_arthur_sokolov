export const GoodReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_GOOD":
      return { good: action.payload };
    default:
      return state;
  }
};
