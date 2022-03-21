import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";

const configureStore = (preloadedState?: any) => {
  const store = createStore(rootReducer, preloadedState);
  return store;
};

const store = configureStore();
export default store;
