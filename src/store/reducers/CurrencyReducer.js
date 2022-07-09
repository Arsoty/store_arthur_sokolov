export const CurrencyReducer = (state = { currency: "USD" }, action) => {
  switch (action.type) {
    case "CURRENCY_CHOISE":
      return {
        currency: action.payload,
      };
    default:
      return state;
  }
};

export const actionCurrencyChoise = (curr) => (dispatch) => {
  dispatch({ type: "CURRENCY_CHOISE", payload: curr });
};
