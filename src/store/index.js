import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { LocalStorageReducer } from "./reducers/LocalStorageReducer";
import { CategoryReducer } from "./reducers/CategoryReducer";
import { GoodReducer } from "./reducers/GoodReducer";
import { CartReducer } from "./reducers/CartReducer";
import { CartModalReducer } from "./reducers/CartModalReducer";
import { CurrencyReducer } from "./reducers/CurrencyReducer";

export const rootReducer = combineReducers({
  cat: LocalStorageReducer(CategoryReducer, "cat"),
  good: LocalStorageReducer(GoodReducer, "good"),
  cart: LocalStorageReducer(CartReducer, "cart"),
  curr: LocalStorageReducer(CurrencyReducer, "curr"),
  modal: CartModalReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));
