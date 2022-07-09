export const CartReducer = (state = {}, action) => {
  switch (action.type) {
    case "CART_ADD":
      return {
        ...state,
        [action.payload.good?.id]: {
          good: action.payload.good,
          count:
            (state[action.payload.good?.id]?.count || 0) +
            +action.payload.count,
        },
      };
    case "CART_CHANGE":
      return {
        ...state,
        [action.payload.good?.id]: {
          good: action.payload.good,
          count: action.payload.count,
        },
      };
    case "CART_REMOVE":
      console.log(action.payload);
      let { [action.payload.good?.id]: removed, ...newState } = state;
      return {
        ...newState,
      };
    case "CART_CLEAR":
      return {};
    default:
      return state;
  }
};

export const actionCartAdd =
  (good, count = 1) =>
  (dispatch) => {
    dispatch({
      type: "CART_ADD",
      payload: {
        good,
        count: count,
      },
    });
  };

export const actionCartChange = (good, count) => (dispatch) => {
  dispatch({
    type: "CART_CHANGE",
    payload: {
      good,
      count: count,
    },
  });
};

export const actionCartRemove = (good) => (dispatch) => {
  dispatch({ type: "CART_REMOVE", payload: { good } });
};

export const actionCartClear = () => (dispatch) => {
  dispatch({ type: "CART_CLEAR" });
};
