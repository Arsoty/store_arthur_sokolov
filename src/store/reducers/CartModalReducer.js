export const CartModalReducer = (state = {}, action) => {
  switch (action.type) {
    case "CART_MODAL_SHOW":
      return {
        visibility: action.payload,
      };
    default:
      return state;
  }
};

export const actionCartModalShow = (modalShow) => (dispatch) => {
  dispatch({ type: "CART_MODAL_SHOW", payload: modalShow });
};
