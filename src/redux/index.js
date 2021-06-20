import { createStore, applyMiddleware, compose } from "redux";
//persisting data on redux after reload
import { persistStore } from "redux-persist";
//middleware
import thunk from "redux-thunk";

import rootReducer from "./store";
//enabeling redux dev tool
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
